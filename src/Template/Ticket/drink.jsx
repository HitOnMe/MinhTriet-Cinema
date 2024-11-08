import React, { useState, useEffect } from 'react';

const products = [
    { id: 1, name: 'Combo Gấu (1 Coke 32oz + 1 Bắp 2 Ngăn 64OZ Phô Mai + Caramel)', price: 50000 },
    { id: 2, name: 'Poca Khoai Tây 54gr', price: 20000 },
    { id: 3, name: 'Poca Wavy 54gr', price: 22000 },
    { id: 4, name: 'Beta Combo 69oz', price: 68000 },
    { id: 5, name: 'Family Combo 69oz', price: 213000 },
    { id: 6, name: 'Sweet Combo 69oz', price: 88000 },
    { id: 7, name: 'Family Combo 69oz', price: 213000 }
];

const PriceTable = ({ price }) => {
    // Khởi tạo số lượng ban đầu là 0
    const [quantities, setQuantities] = useState(products.map(() => 0));

    // Hàm cập nhật số lượng
    const updateQuantity = (index, change) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            // Giới hạn số lượng tối thiểu là 0
            newQuantities[index] = Math.max(0, newQuantities[index] + change);
            return newQuantities;
        });
    };

    // Sử dụng useEffect để truyền giá trị tổng giá
    useEffect(() => {
        const totalDrink = quantities.reduce(
            (total, qty, idx) => total + qty * products[idx].price,
            0
        );
        price(totalDrink); // Truyền tổng giá trị thông qua hàm callback `price`
    }, [quantities, price]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Bắp nước</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', color: '#333' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sản phẩm</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Giá tiền (VND)</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Số lượng</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tổng cộng (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>
                                {product.price.toLocaleString('vi-VN')}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }} className="quantity-control">
                                <button
                                    style={{
                                        padding: '5px 10px',
                                        margin: '0 5px',
                                        border: '1px solid #ddd',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                    }}
                                    onClick={() => updateQuantity(index, -1)}
                                >
                                    -
                                </button>
                                <span style={{ padding: '0 10px' }} className="quantity">{quantities[index]}</span>
                                <button
                                    style={{
                                        padding: '5px 10px',
                                        margin: '0 5px',
                                        border: '1px solid #ddd',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                    }}
                                    onClick={() => updateQuantity(index, 1)}
                                >
                                    +
                                </button>
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }} className="total">
                                {(product.price * quantities[index]).toLocaleString('vi-VN')}
                            </td>
                        </tr>
                    ))}
                    {/* Hiển thị tổng giá trị bắp nước (dùng để tham khảo) */}
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <td colSpan="3" style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right', fontWeight: 'bold' }}>
                            Tổng giá đồ uống:
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right', fontWeight: 'bold' }}>
                            {quantities.reduce((total, qty, idx) => total + qty * products[idx].price, 0).toLocaleString('vi-VN')} VND
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PriceTable;
