/** @odoo-module **/

import { Component, useState, onWillStart, useEnv} from "@odoo/owl";
import { rpc } from "@web/core/network/rpc";
import { registry } from "@web/core/registry";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    setup(){
        this.env = useEnv();
        this.salesCount = useState({count: 0});
        this.productsCount = useState({count: 0});

        onWillStart(async() => {
            this.salesCount.count = await this.fetchSalesCount();
            this.productsCount.count = await this.fetchProductsCount();
        })
    }

    async fetchSalesCount(){
        const salesCount = await rpc('/sales-count', {});
        return salesCount;
    }

    async fetchProductsCount(){
        const productsCount = await rpc('/products-count', {});
        return productsCount;
    }

    redirectToSales(){
        this.env.services.action.doAction('sale.action_orders');
    }

    redirectToProducts(){
        this.env.services.action.doAction('product.product_template_action')
    }
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);