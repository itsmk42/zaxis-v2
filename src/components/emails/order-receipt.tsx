import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Row,
    Column,
} from '@react-email/components';

interface OrderItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}

interface OrderReceiptProps {
    customerName: string;
    orderNumber: string;
    items: OrderItem[];
    subtotal: number;
    totalGst: number;
    shippingCost: number;
    grandTotal: number;
    paymentMethod: string;
    paymentStatus: string;
    shippingAddress: {
        name: string;
        line1: string;
        line2?: string;
        city: string;
        state: string;
        pincode: string;
    };
}

export default function OrderReceipt({
    customerName = 'Valued Customer',
    orderNumber = 'ZA-000000',
    items = [],
    subtotal = 0,
    totalGst = 0,
    shippingCost = 0,
    grandTotal = 0,
    paymentMethod = 'COD',
    paymentStatus = 'PENDING',
    shippingAddress = {
        name: 'Customer Name',
        line1: 'Address Line 1',
        city: 'City',
        state: 'State',
        pincode: '000000',
    },
}: OrderReceiptProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getPaymentStatusText = () => {
        if (paymentMethod === 'COD') {
            return '💵 Due on Delivery';
        }
        if (paymentMethod === 'UPI' && paymentStatus === 'PENDING') {
            return '⏳ Verification Pending';
        }
        return '✅ Payment Confirmed';
    };

    return (
        <Html>
            <Head />
            <Preview>Order Confirmation - {orderNumber} | Z Axis Studio</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={logo}>Z Axis Studio</Heading>
                        <Text style={tagline}>Engineering Art into Reality</Text>
                    </Section>

                    <Hr style={hr} />

                    {/* Greeting */}
                    <Section style={content}>
                        <Heading style={h1}>Thank You for Your Order! 🎉</Heading>
                        <Text style={text}>
                            Hi <strong>{customerName}</strong>,
                        </Text>
                        <Text style={text}>
                            We've received your order and we're excited to bring your custom 3D printed creation to life!
                            Your order details are below.
                        </Text>
                    </Section>

                    {/* Order Info */}
                    <Section style={orderInfo}>
                        <Row>
                            <Column>
                                <Text style={orderLabel}>Order Number</Text>
                                <Text style={orderValue}>{orderNumber}</Text>
                            </Column>
                            <Column align="right">
                                <Text style={orderLabel}>Payment Status</Text>
                                <Text style={orderValue}>{getPaymentStatusText()}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    {/* Order Items */}
                    <Section style={content}>
                        <Heading style={h2}>Order Summary</Heading>
                        <table style={itemsTable}>
                            <thead>
                                <tr>
                                    <th style={tableHeader}>Item</th>
                                    <th style={tableHeaderCenter}>Qty</th>
                                    <th style={tableHeaderRight}>Price</th>
                                    <th style={tableHeaderRight}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} style={tableRow}>
                                        <td style={tableCell}>{item.productName}</td>
                                        <td style={tableCellCenter}>{item.quantity}</td>
                                        <td style={tableCellRight}>{formatPrice(item.unitPrice)}</td>
                                        <td style={tableCellRight}>{formatPrice(item.lineTotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Section>

                    <Hr style={hr} />

                    {/* Totals */}
                    <Section style={totalsSection}>
                        <Row style={totalRow}>
                            <Column>
                                <Text style={totalLabel}>Subtotal</Text>
                            </Column>
                            <Column align="right">
                                <Text style={totalValue}>{formatPrice(subtotal)}</Text>
                            </Column>
                        </Row>
                        <Row style={totalRow}>
                            <Column>
                                <Text style={totalLabel}>GST</Text>
                            </Column>
                            <Column align="right">
                                <Text style={totalValue}>{formatPrice(totalGst)}</Text>
                            </Column>
                        </Row>
                        <Row style={totalRow}>
                            <Column>
                                <Text style={totalLabel}>Shipping</Text>
                            </Column>
                            <Column align="right">
                                <Text style={totalValue}>{formatPrice(shippingCost)}</Text>
                            </Column>
                        </Row>
                        <Hr style={hrThin} />
                        <Row style={totalRow}>
                            <Column>
                                <Text style={grandTotalLabel}>Grand Total</Text>
                            </Column>
                            <Column align="right">
                                <Text style={grandTotalValue}>{formatPrice(grandTotal)}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    {/* Shipping Address */}
                    <Section style={content}>
                        <Heading style={h2}>Shipping Address</Heading>
                        <Text style={address}>
                            {shippingAddress.name}
                            <br />
                            {shippingAddress.line1}
                            <br />
                            {shippingAddress.line2 && (
                                <>
                                    {shippingAddress.line2}
                                    <br />
                                </>
                            )}
                            {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                        </Text>
                    </Section>

                    <Hr style={hr} />

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            <strong>Questions about your order?</strong>
                        </Text>
                        <Text style={footerText}>
                            Reply to this email or WhatsApp us at <strong>+91 XXXXX XXXXX</strong>
                        </Text>
                        <Text style={footerText}>
                            We typically respond within 24 hours.
                        </Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={footer}>
                        <Text style={footerSmall}>
                            Z Axis Studio | Mangaluru, Karnataka, India
                            <br />
                            Premium 3D Printed Creations
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
};

const header = {
    padding: '32px 24px',
    backgroundColor: '#101010',
    textAlign: 'center' as const,
};

const logo = {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
};

const tagline = {
    color: '#ffffff',
    fontSize: '14px',
    margin: '8px 0 0',
    opacity: 0.8,
};

const content = {
    padding: '0 24px',
};

const h1 = {
    color: '#101010',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '24px 0 16px',
    padding: '0',
};

const h2 = {
    color: '#101010',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '24px 0 16px',
    padding: '0',
};

const text = {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '8px 0',
};

const orderInfo = {
    padding: '16px 24px',
    backgroundColor: '#f6f9fc',
    margin: '0',
};

const orderLabel = {
    color: '#8898aa',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    margin: '0 0 4px',
};

const orderValue = {
    color: '#101010',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const hrThin = {
    borderColor: '#e6ebf1',
    margin: '8px 0',
};

const itemsTable = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    margin: '16px 0',
};

const tableHeader = {
    color: '#8898aa',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    textAlign: 'left' as const,
    padding: '8px 0',
    borderBottom: '2px solid #e6ebf1',
};

const tableHeaderCenter = {
    ...tableHeader,
    textAlign: 'center' as const,
};

const tableHeaderRight = {
    ...tableHeader,
    textAlign: 'right' as const,
};

const tableRow = {
    borderBottom: '1px solid #e6ebf1',
};

const tableCell = {
    color: '#525f7f',
    fontSize: '14px',
    padding: '12px 0',
};

const tableCellCenter = {
    ...tableCell,
    textAlign: 'center' as const,
};

const tableCellRight = {
    ...tableCell,
    textAlign: 'right' as const,
};

const totalsSection = {
    padding: '0 24px',
};

const totalRow = {
    margin: '8px 0',
};

const totalLabel = {
    color: '#525f7f',
    fontSize: '14px',
    margin: '0',
};

const totalValue = {
    color: '#101010',
    fontSize: '14px',
    margin: '0',
};

const grandTotalLabel = {
    color: '#101010',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
};

const grandTotalValue = {
    color: '#101010',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
};

const address = {
    color: '#525f7f',
    fontSize: '14px',
    lineHeight: '22px',
    margin: '0',
};

const footer = {
    padding: '0 24px',
    textAlign: 'center' as const,
};

const footerText = {
    color: '#525f7f',
    fontSize: '14px',
    lineHeight: '22px',
    margin: '8px 0',
};

const footerSmall = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '18px',
    margin: '8px 0',
};
