const path = require('path');
const express = require('express');
const router = express.Router();

let pages = [
    {
        title: 'Dashboard',     
        name: 'index', 
        url: '/', 
        data:{
            inventory: '20', 
            in_stock: '20', 
            out_of_stock: '5',
            total_staff: '5',
            chefs: '2',
            servers: '3',
            managers: '1',
            total_branches: '2',
            open_branches: '2',
            closed_branches: '0'}
    },
    {
        title: 'Inventory', 
        name: 'inventory', 
        url: '/inventory',
        data:{
            inventory: '10', 
            in_stock: '5', 
            out_of_stock: '5'}
    },
    {
        title: 'Staff', 
        name: 'staff', 
        url: '/staff',
        data:{
            inventory: '10', 
            in_stock: '5', 
            out_of_stock: '5'}
    },
    {
        title: 'Branches', 
        name: 'branches', 
        url: '/branches',
        data:{
            inventory: '10', 
            in_stock: '5', 
            out_of_stock: '5'}
    },
    {
        title: 'Administration', 
        name: 'administration', 
        url: '/administration',
        data:{
            inventory: '10', 
            in_stock: '5', 
            out_of_stock: '5'}
    }
];

pages.forEach(page => {
    router.get(page.url, (req, res) => {
        res.render(page.name, {title: page.title, data: page.data});
    });
});

module.exports = router;