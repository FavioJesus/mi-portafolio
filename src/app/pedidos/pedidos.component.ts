import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

type CartItem = MenuItem & {
  quantity: number;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Pollo broaster',
    description: 'Pieza crocante con papas fritas y ensalada fresca.',
    price: 18,
    category: 'Platos',
  },
  {
    id: 2,
    name: 'Lomo saltado',
    description: 'Carne salteada, papas doradas, arroz y toque criollo.',
    price: 24,
    category: 'Platos',
  },
  {
    id: 3,
    name: 'Hamburguesa royal',
    description: 'Carne artesanal, queso, huevo, papas y salsas de casa.',
    price: 20,
    category: 'Sandwiches',
  },
  {
    id: 4,
    name: 'Salchipapa especial',
    description: 'Papas crocantes, hot dog, pollo deshilachado y cremas.',
    price: 16,
    category: 'Para compartir',
  },
  {
    id: 5,
    name: 'Chicha morada',
    description: 'Vaso helado de chicha morada natural.',
    price: 6,
    category: 'Bebidas',
  },
  {
    id: 6,
    name: 'Limonada frozen',
    description: 'Limonada granizada, fresca y bien acida.',
    price: 8,
    category: 'Bebidas',
  },
];

@Component({
  selector: 'app-pedidos',
  imports: [CurrencyPipe],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidosComponent {
  protected readonly menuItems = MENU_ITEMS;
  protected readonly cart = signal<CartItem[]>([]);
  protected readonly showProforma = signal(false);
  protected readonly receiptNumber = signal('');
  protected readonly generatedAt = signal('');
  protected readonly shareStatus = signal('');
  protected readonly qrPath = '/assets/images/miqr.jpeg';

  protected readonly total = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  protected readonly whatsappHref = computed(() => {
    const lines = this.cart().map(
      (item) =>
        `- ${item.quantity} x ${item.name}: S/ ${(item.price * item.quantity).toFixed(2)}`,
    );

    const message = [
      'Hola, quiero hacer este pedido:',
      '',
      ...lines,
      '',
      `Total proforma: S/ ${this.total().toFixed(2)}`,
      '',
      'Adjunto el pago por QR y quedo atento a la confirmacion.',
    ].join('\n');

    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  });

  protected readonly receiptFileName = computed(() =>
    `proforma-${this.receiptNumber() || 'pedido'}.png`,
  );

  protected addItem(item: MenuItem): void {
    this.showProforma.set(false);
    this.shareStatus.set('');
    this.cart.update((items) => {
      const current = items.find((cartItem) => cartItem.id === item.id);

      if (current) {
        return items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...items, { ...item, quantity: 1 }];
    });
  }

  protected removeItem(itemId: number): void {
    this.showProforma.set(false);
    this.shareStatus.set('');
    this.cart.update((items) =>
      items
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  protected clearCart(): void {
    this.cart.set([]);
    this.showProforma.set(false);
    this.receiptNumber.set('');
    this.generatedAt.set('');
    this.shareStatus.set('');
  }

  protected generateProforma(): void {
    const now = new Date();
    const receiptId = now
      .toISOString()
      .replace(/\D/g, '')
      .slice(2, 14);

    this.receiptNumber.set(`PF-${receiptId}`);
    this.generatedAt.set(
      new Intl.DateTimeFormat('es-PE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(now),
    );
    this.shareStatus.set('');
    this.showProforma.set(true);
  }

  protected async shareReceipt(): Promise<void> {
    if (!this.cart().length) {
      return;
    }

    if (!this.showProforma()) {
      this.generateProforma();
    }

    this.shareStatus.set('Generando imagen de la boleta...');

    try {
      const blob = await this.createReceiptBlob();
      const file = new File([blob], this.receiptFileName(), { type: 'image/png' });
      const nav = navigator as Navigator & {
        canShare?: (data: ShareData) => boolean;
        share?: (data: ShareData) => Promise<void>;
      };

      if (nav.share && (!nav.canShare || nav.canShare({ files: [file] }))) {
        await nav.share({
          title: 'Proforma de pedido',
          text: 'Hola, quiero hacer este pedido. Te comparto mi proforma.',
          files: [file],
        });
        this.shareStatus.set('Boleta lista para enviar.');
        return;
      }

      this.downloadBlob(blob);
      window.open(this.whatsappHref(), '_blank', 'noopener');
      this.shareStatus.set('Descargue la imagen y abri WhatsApp con el pedido.');
    } catch {
      window.open(this.whatsappHref(), '_blank', 'noopener');
      this.shareStatus.set('No se pudo crear la imagen. Abri WhatsApp con el pedido en texto.');
    }
  }

  protected printReceipt(): void {
    window.print();
  }

  private async createReceiptBlob(): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const width = 900;
    const padding = 56;
    const rowHeight = 52;
    const qrSize = 190;
    const height = 470 + this.cart().length * rowHeight + qrSize;
    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas no disponible');
    }

    context.scale(scale, scale);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#211b18';
    context.font = '700 34px Arial';
    context.fillText('PROFORMA DE PEDIDO', padding, 72);
    context.font = '16px Arial';
    context.fillStyle = '#67594f';
    context.fillText('Restaurant Demo', padding, 105);
    context.fillText(`Nro: ${this.receiptNumber()}`, padding, 132);
    context.fillText(`Fecha: ${this.generatedAt()}`, padding, 158);

    context.strokeStyle = '#e6d7c8';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(padding, 190);
    context.lineTo(width - padding, 190);
    context.stroke();

    let y = 230;
    context.font = '700 16px Arial';
    context.fillStyle = '#211b18';
    context.fillText('Detalle', padding, y);
    context.fillText('Cant.', 560, y);
    context.fillText('Importe', 700, y);
    y += 28;

    context.font = '16px Arial';
    for (const item of this.cart()) {
      context.fillStyle = '#211b18';
      context.fillText(item.name, padding, y);
      context.fillStyle = '#67594f';
      context.fillText(`${item.quantity}`, 570, y);
      context.fillText(`S/ ${(item.price * item.quantity).toFixed(2)}`, 700, y);
      y += rowHeight;
    }

    context.strokeStyle = '#e6d7c8';
    context.beginPath();
    context.moveTo(padding, y - 18);
    context.lineTo(width - padding, y - 18);
    context.stroke();

    context.font = '700 26px Arial';
    context.fillStyle = '#1f6b55';
    context.fillText('TOTAL', padding, y + 28);
    context.fillText(`S/ ${this.total().toFixed(2)}`, 700, y + 28);

    const qr = await this.loadImage(this.qrPath);
    context.fillStyle = '#f8fbf2';
    context.fillRect(padding, y + 70, qrSize + 28, qrSize + 28);
    context.drawImage(qr, padding + 14, y + 84, qrSize, qrSize);

    context.fillStyle = '#211b18';
    context.font = '700 20px Arial';
    context.fillText('Pago por QR', padding + qrSize + 54, y + 118);
    context.font = '16px Arial';
    context.fillStyle = '#67594f';
    this.drawText(
      context,
      'Esta proforma es una prueba. Envia esta imagen por WhatsApp para confirmar el pedido.',
      padding + qrSize + 54,
      y + 150,
      510,
      24,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error('No se pudo generar la imagen'));
      }, 'image/png');
    });
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('No se pudo cargar el QR'));
      image.src = src;
    });
  }

  private drawText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ): void {
    const words = text.split(' ');
    let line = '';

    for (const word of words) {
      const testLine = `${line}${word} `;
      const metrics = context.measureText(testLine);

      if (metrics.width > maxWidth && line) {
        context.fillText(line, x, y);
        line = `${word} `;
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x, y);
  }

  private downloadBlob(blob: Blob): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = this.receiptFileName();
    link.click();
    URL.revokeObjectURL(url);
  }
}
