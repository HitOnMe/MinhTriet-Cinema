import React, { useState } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Biểu tượng dấu check (nếu cần)

const paymentMethods = [
    { id: 1, name: 'Fundiin', icon: <CreditCardIcon style={{ color: '#f39c12' }} /> },
    { id: 2, name: 'Ví MoMo', icon: <LocalAtmIcon style={{ color: '#e91e63' }} /> },
    { id: 3, name: 'Quét mã QR', icon: <QrCodeScannerIcon style={{ color: '#4caf50' }} /> },
    { id: 4, name: 'Chuyển khoản/Internet Banking', icon: <AccountBalanceIcon style={{ color: '#2196f3' }} /> },
    { id: 5, name: 'Ví ShopeePay', icon: <LocalAtmIcon style={{ color: '#ff5722' }} /> },
    { id: 6, name: 'Thẻ Visa/Master/JCB', icon: <CreditCardIcon style={{ color: '#9c27b0' }} /> },
    { id: 7, name: 'Thẻ ATM nội địa', icon: <LocalAtmIcon style={{ color: '#795548' }} /> },
    { id: 8, name: 'Ví FPT Play', icon: <LocalAtmIcon style={{ color: '#3f51b5' }} /> },
];

const PaymentOptions = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);

    const handleSelect = (id) => {
        setSelectedMethod(id);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' }}>
            <h3>Hình thức thanh toán</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 15px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            backgroundColor: selectedMethod === method.id ? '#fff9c4' : 'transparent',
                        }}
                        onClick={() => handleSelect(method.id)}
                    >
                        <span style={{ marginRight: '10px', fontSize: '24px' }}>{method.icon}</span>
                        <span>{method.name}</span>
                        {selectedMethod === method.id && (
                            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                <input type="checkbox" checked readOnly style={{ marginRight: '8px' }} />
                                <CheckCircleIcon style={{ color: 'green' }} />
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentOptions;
