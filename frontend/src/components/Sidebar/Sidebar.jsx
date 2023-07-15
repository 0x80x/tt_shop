import React from 'react';

import './Sidebar.css';

import Button from '../../ui/Button/Button';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Button cls="success" to="/">Home</Button>
                </li>
                <li>
                    <Button cls="primary" to="/buyers">Покупатели</Button>
                </li>
                <li>
                    <Button cls="primary" to="/products">Товары</Button>
                </li>
                <li>
                    <Button cls="danger" to="/purchases">Реестр покупок</Button>
                </li>
                <li>
                    <Button cls="secondary" to="/report">Сводный отчет</Button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;