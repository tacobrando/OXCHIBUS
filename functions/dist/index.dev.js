"use strict";

var functions = require('firebase-functions');

var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var SENDGRID_API_KEY = functions.config().sendgrid.key;

var sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);
exports.firestoreEmail = functions.firestore.document('unverified/{documentId}').onCreate(function (snap, context) {
  var documentId = context.params.documentId;
  var db = admin.firestore();
  return db.collection('unverified').doc(documentId).get().then(function (doc) {
    var info = doc.data();
    var msg = {
      to: info.email,
      from: 'reply@oxchibus.co.uk',
      subject: 'Confirmation',
      templateId: 'd-a474cd1360074d43ac4af7f28cef80d3',
      dynamic_template_data: {
        "name": info.name,
        "business_name": info.business_name
      }
    };
    return sgMail.send(msg), {
      success: true
    };
  }).then(function () {
    return console.log('email sent!');
  })["catch"](function (err) {
    return console.log(err);
  });
});
exports.firestoreOwnerEmail = functions.firestore.document('unverified/{documentId}').onCreate(function (snap, context) {
  var documentId = context.params.documentId;
  var db = admin.firestore();
  return db.collection('unverified').doc(documentId).get().then(function (doc) {
    var info = doc.data();
    var msg = {
      to: 'admin@oxchibus.co.uk',
      from: 'reply@oxchibus.co.uk',
      templateId: 'd-1ad59696d3874a7c9069ecc363a0403b'
    };
    return sgMail.send(msg), {
      success: true
    };
  }).then(function () {
    return console.log('email sent!');
  })["catch"](function (err) {
    return console.log(err);
  });
});