const functions = require('firebase-functions');
const admin = require('firebase-admin')


admin.initializeApp(functions.config().firebase)

const SENDGRID_API_KEY = functions.config().sendgrid.key
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)

exports.firestoreEmail = functions.firestore
    .document('unverified/{documentId}')
    .onCreate((snap, context) => {
        const documentId = context.params.documentId
        const db = admin.firestore()
        return db.collection('unverified').doc(documentId)
                .get()
                .then(doc => {
                    const info = doc.data()
                    const msg = {
                        to: info.email,
                        from: 'reply@oxchibus.co.uk',
                        subject: 'Confirmation',
                        templateId: 'd-a474cd1360074d43ac4af7f28cef80d3',
                        dynamic_template_data: {
                            "name": info.name,
                            "business_name": info.business_name
                        }
                    }
                    return sgMail.send(msg), { success: true }
                })
                .then(() => {
                    alert("Success!")
                    console.log('email sent!')
                })
                .catch(err => {
                    alert("Error! Invalid email")
                    console.log(err)
                })

    })

exports.firestoreOwnerEmail = functions.firestore
    .document('unverified/{documentId}')
    .onCreate((snap, context) => {
        const documentId = context.params.documentId
        const db = admin.firestore()
        return db.collection('unverified').doc(documentId)
                .get()
                .then(doc => {
                    const info = doc.data()
                    const msg = {
                        to: 'admin@oxchibus.co.uk',
                        from: 'reply@oxchibus.co.uk',
                        templateId: 'd-1ad59696d3874a7c9069ecc363a0403b',
                        dynamic_template_data: {
                            "name": info.name,
                            "business_name": info.business_name,
                            "email": info.email
                        }
                    }
                    return sgMail.send(msg), { success: true }
                })
                .then(() => console.log('email sent!'))
                .catch(err => console.log(err))

    })