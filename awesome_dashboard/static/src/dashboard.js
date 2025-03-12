/** @odoo-module **/

import { Component, useState, onWillStart, useEnv} from "@odoo/owl";
import { rpc } from "@web/core/network/rpc";
import { registry } from "@web/core/registry";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    setup(){
        this.env = useEnv();
        this.topSales = useState({sales: []});
        this.topPO = useState({po: []});
        this.salesCount = useState({count: 0});
        this.productsCount = useState({count: 0});

        onWillStart(async() => {
            this.salesCount.count = await this.fetchSalesCount();
            this.productsCount.count = await this.fetchProductsCount();
            this.topSales.sales = await this.fetchTopSales();
            this.topPO.po = await this.fetchTopPO();
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

    async fetchTopSales(){
        const _topSales = await rpc('/fetch-top-sales');
        return _topSales;
    }

    async fetchTopPO(){
        const _topPO = await rpc('/fetch-top-purchase-orders');
        return _topPO;
    }

    openSaleOrder(event){
        const sale_id = parseInt(event.target.dataset.saleId);

        if(sale_id){
            this.env.services.action.doAction({
              type: 'ir.actions.act_window',
              res_model: 'sale.order',
              res_id: sale_id,
              views: [[false, 'form']],
              target: 'current',
            })
        }

        else{
            return;
        }
    }

    openPurchaseOrder(event){
        const purchase_order_id = parseInt(event.target.dataset.purchaseOrderId);

        if(purchase_order_id){
            this.env.services.action.doAction({
              type: 'ir.actions.act_window',
              res_model: 'purchase.order',
              res_id: purchase_order_id,
              views: [[false, 'form']],
              target: 'current',
            })
        }

        else{
            return;
        }
    }
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);