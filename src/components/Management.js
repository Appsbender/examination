import React, { useState, useEffect } from 'react';

const formData = {
    keywords: "",
}
const Management = ({ isLoginState }) => {
    const [cssClass, setCSSClass] = useState('activate-fade');
    const [products, setProducts] = useState([]);
    const [detail, setDetail] = useState(formData);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const loadProducts = async () => {
        try {
            const result = await fetch(`https://dummyjson.com/products?limit=10`);
            const data = await result.json();

            if (result.ok) {
                setProducts(data.products);
            } else {
                console.error(`Error fetching products: ${result.status} - ${result.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const searchProducts = async (e) => {
        e.preventDefault();
        try {
            const result = await fetch(`https://dummyjson.com/products/search?limit=10&q=${detail.keywords}`);
            const data = await result.json();

            if (result.ok) {
                setProducts(data.products);
            } else {
                console.error(`Error fetching products: ${result.status} - ${result.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const handleSort = (key) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortKey(key);

        const sortedProducts = [...products].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue < bValue) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setProducts(sortedProducts);
    };

    const getArrowIndicator = (key) => {
        if (key === sortKey) {
            const arrowHtml = sortOrder === 'asc' ? '&uarr;' : '&darr;';
            return <span dangerouslySetInnerHTML={{ __html: arrowHtml }} />;
        }
        return '';
    };

    const onChange = (e) => {
        setDetail({
            ...detail,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSignOut = () => {
        setCSSClass('deactivate-fade');
        setTimeout(() => {
            isLoginState(false);
        }, 2500);
    };

    return (
        <>
            <div className={`apps-container ${cssClass}`}>
                <div>
                    <section className="user-action">
                        Hi John Doe! <button onClick={handleSignOut} className='apps-btn apps-btn-md apps-btn-warning'>SIGN OUT</button>
                    </section>
                </div>
                <div className="table-header">
                    <h1>Products Management</h1>
                    <form className="search-bar" onSubmit={searchProducts}>
                        <input type="text" name='keywords' onChange={onChange} placeholder="Search..." />
                        <button>Search</button>
                    </form>
                </div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th onClick={() => handleSort('title')}>
                                Title {getArrowIndicator('title')}
                            </th>
                            <th onClick={() => handleSort('description')}>
                                Description {getArrowIndicator('description')}
                            </th>
                            <th onClick={() => handleSort('price')}>
                                Price {getArrowIndicator('price')}
                            </th>
                            <th onClick={() => handleSort('rating')}>
                                Rating {getArrowIndicator('rating')}
                            </th>
                            <th onClick={() => handleSort('stock')}>
                                Stock {getArrowIndicator('stock')}
                            </th>
                            <th onClick={() => handleSort('brand')}>
                                Brand {getArrowIndicator('brand')}
                            </th>
                            <th onClick={() => handleSort('category')}>
                                Category {getArrowIndicator('category')}
                            </th>
                            <th className="action">Action</th>
                        </tr>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.rating}</td>
                                <td>{product.stock}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td className="action">
                                    <button className="apps-btn apps-btn-sm apps-btn-success">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Management;
