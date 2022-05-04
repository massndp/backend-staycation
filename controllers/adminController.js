const Category = require('../models/Category');
const Bank = require('../models/Bank');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewDashboard : (req, res) => {
        res.render('admin/dashboard/view_dashboard', {
            title: "Staycation | Dashboard"
        });
    },

    // CATEGORY
    // READ
    viewCategory: async(req, res) => {
       try {
            const category = await Category.find();
            // console.log(category);
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/category/view_category', {
                category, 
                alert,
                title: "Staycation | Category"
            });
       } catch (error) {
            res.render('admin/category')
       }
    },
    // CREATE
    addCategory: async(req, res) => {
        try {     
            const {name} = req.body;
            // console.log(name);
            await Category.create({name});
            req.flash('alertMessage', 'Success add category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
    },
    // UPDATE
    editCategory: async(req, res) => {

        try {
            const {id, name} = req.body;
            // console.log(id);
            const category = await Category.findOne({_id: id});
            category.name = name;
            await category.save();
            req.flash('alertMessage', 'Success update category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
            // console.log(category);
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
    },
    // DELETE
    deleteCategory: async(req, res)  => {
      try {
        const {id} = req.params;
        const category = await Category.findOne({_id: id});
        await category.remove();
        req.flash('alertMessage', 'Success delete category');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/category');
      } catch (error) {
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/category');
      }
    },

    //BANK
    //READ
  
    viewBank: async (req, res) => {
       try {
            const bank = await Bank.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/bank/view_bank', {
                bank, 
                alert,
                title: "Staycation | Bank"
            });
       } catch (error) {
           res.render('admin/bank');
       }
    },
    //CREATE
    addBank: async (req, res) => {
        try {
            const {name, nameBank, nomorRekening} = req.body;
            await Bank.create({
                name,
                nameBank,
                nomorRekening,
                imageUrl: `images/${req.file.filename}`
            });

            req.flash('alertMessage', 'Success Create Bank');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/bank');

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },

    //EDIT BANK
    editBank: async(req, res) => {
        try {
            const {id, nameBank, nomorRekening, name} = req.body;
            const bank = await Bank.findOne({_id: id});

            if(req.file == undefined){
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                bank.name = name;
                await bank.save();

                req.flash('alertMessage', 'Success update Bank');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/bank');
            }else{
                await fs.unlink(path.join(`public/${bank.imageUrl}`));
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                bank.imageUrl = `images/${req.file.filename}`;
                await bank.save();
                req.flash('alertMessage', 'Success update Bank');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/bank');
            }  
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },

    viewItem: (req, res) => {
        res.render('admin/item/view_item', {
            title: "Staycation | Item"
        });
    },

    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {
            title: "Staycation | Booking"
        });
    }
}