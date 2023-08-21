import React, { Component } from 'react';

class InvoiceManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceList: [
                { invoiceNumber: "12345", customerName: "客户A" },
                { invoiceNumber: "67890", customerName: "客户B" }
            ]
        };
    }

    addInvoiceItem = (invoiceNumber, customerName) => {
        this.setState(prevState => ({
            invoiceList: [...prevState.invoiceList, { invoiceNumber, customerName }]
        }));
    }

    submitToAdmin = () => {
        // Send today's edited invoices to the admin
        // Implement your submission logic here

        // Clear the invoice list
        this.setState({ invoiceList: [] });
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Invoice管理</h1>
                </header>

                <button className="button button-primary" onClick={this.addInvoiceItem}>
                    添加新Invoice
                </button>

                <section>
                    <h2>继续编辑今天的发票</h2>
                    <ul id="invoiceList">
                        {this.state.invoiceList.map((invoice, index) => (
                            <li key={index}>
                                Invoice号码: {invoice.invoiceNumber}, 客户名称: {invoice.customerName}
                            </li>
                        ))}
                    </ul>
                </section>

                <button onClick={this.submitToAdmin}>今日发票提交到管理员</button>
            </div>
        );
    }
}

export default InvoiceManagement;
