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
    Button,
} from '@react-email/components';

interface OrderShippedEmailProps {
    customerName: string;
    orderNumber: string;
}

export default function OrderShippedEmail({
    customerName = 'Customer',
    orderNumber = 'ZA-000000',
}: OrderShippedEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Your Order has Shipped! - {orderNumber} | Z Axis Studio</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={logo}>Z Axis Studio</Heading>
                    </Section>

                    {/* Content */}
                    <Section style={content}>
                        <Heading style={h1}>Your Order is on the Way! 🚀</Heading>
                        <Text style={text}>
                            Hi <strong>{customerName}</strong>,
                        </Text>
                        <Text style={text}>
                            Your order <strong>{orderNumber}</strong> has been dispatched and is making its way to you.
                        </Text>
                        <Text style={text}>
                            You will receive a separate message with tracking details shortly.
                            Please allow 3-5 business days for delivery depending on your location.
                        </Text>

                        <Button style={button} href={`https://zaxisstudio.com/account`}>
                            Track Order
                        </Button>
                    </Section>

                    <Hr style={hr} />

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            Questions? Reply to this email or WhatsApp us.
                        </Text>
                        <Text style={footerSmall}>
                            Z Axis Studio | Mangaluru, Karnataka
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

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
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
};

const content = {
    padding: '24px',
};

const h1 = {
    color: '#101010',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 24px',
};

const text = {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 16px',
};

const button = {
    backgroundColor: '#101010',
    borderRadius: '4px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    padding: '12px',
    marginTop: '16px',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const footer = {
    padding: '0 24px',
    textAlign: 'center' as const,
};

const footerText = {
    color: '#525f7f',
    fontSize: '14px',
    margin: '8px 0',
};

const footerSmall = {
    color: '#8898aa',
    fontSize: '12px',
    margin: '8px 0',
};
