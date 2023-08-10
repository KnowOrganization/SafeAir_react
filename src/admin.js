import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import pkg from 'firebase-admin';

try {
    pkg.initializeApp({
      credential: pkg.credential.cert({
        projectId: 'safeair-b0c14',
        clientEmail: 'firebase-adminsdk-jp9g9@safeair-b0c14.iam.gserviceaccount.com',
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZa/uxSISQoJm3\n5gFDTYQELy4euFUyObLISuKyAJ1l2YWyLc91mSL4+qGpsr3kwORAuNgnGGPWqtSC\nsaio4iySjm10iEI0JqGBmg98tMq2g6zmGer/SKhDu/YGCD0isMjV7NFHjI8Y6MaR\nWlsXqsqDNV+NpGccNqmGpekLLC4wW0SJVWNc+Npk1LV98nyFRyH6tLjpgQwt0sJW\n8O6DmP16xB3TeXAxnkDlYjpxAjNYA+YhObn+Ke+g4obuCXwiKzms0spL4n1t8ygy\nd1GHw0YQZqNfWvTqIKDlJ0qkCIRk91tvXbj/EuZdvajeUZUggxhVHsHIAAi1maNN\ni6E6MFCfAgMBAAECggEANeuOnOMIvC/Fdq1eekHvCO1v/xn3z1wZ6mzvOXIf32DQ\nrSuOgx0b/ndPg+2u8YudbOXKCgt3Y0XMxFYeGaTL14I5E8Cjy+Jb1snHcaO0ruqe\nRIyNW8U0ZgHUWJBitCN/ojfF4aiTzkRZLVKdOzcqT2zdtVE3b+ICOLFssyGG5jVR\nmkKgVnJ7EoqiqsyMyyks7o/u5+410tJgbrlnh1LOxUon9GFsBhbmakxFMiBjVK7O\nEPt5ImS7LjoCsYxYfi3H4AebByaKEVD3qvWhQZCU/WtNdwz45EdUHGFvxMbPeEi/\nMqe65KD/21sNCXBI6eilByUe6+SM+04lYDo1Po/p6QKBgQDXaLxgmgaF4SQqP+m8\nkzDstr6svDH0soWXIafXT2T2bylFw+Aujuc6AJJahOKtsoNhbKFmU6CMn/M3KTE9\nsB9xcbaNotHsmK49UwP3mHRkAMjRu14c/UbGmaLeiLrMKj688Qxz81DyWPexVYNP\nG5XBlqWriOFCkOuIDSK2Ad0+VQKBgQC2VP/9sUbOOpqfswMCFH9fUILI/c3pJ/Z5\nEzuHNSfEZtsJ3r8NYXZvXicBvUTiRhrYiIUkVL7Udffe4kwzb7KkszJulAp4+6Wr\nVQcG8NUmqNwbFMijrFcNl3ID2bMPDgFTIfql/l2pagyvHjmw7WcTl7cSWGDRU3h+\nY4C+OFKfIwKBgDfotUwVbi/9eZeFszMAuSgXXnIS/pxWYZoSYC/gKYJU4895wYwU\nByvkzhe0eek/dh4pRdL7TaZyNXxRsrgiKGcXbpxgcEAKeN7t1w/CgCMcmQLmsMyx\naFdPtRgxQNqQ9Gux3NuTgaUFNnTOjyBPNpVidmmJQ341gwxy7Fl1LmlpAoGBAI+f\nHtIP3S0/XmLjWEBAMyC6Q3rc6WB6GRy/+IkFZuC/AFSi/60jk24gJOuq0eLGxAjC\naNX4ZyTmE6yeZtWxa29utBAETseDubjezh06gTvlkRNH6M98RkovfCDqT7BRINwC\nDPTKC68SGRGr5lemeSYmwI8TzJe2f1hXOqcbqIEvAoGBAKXaGaHAAtuSjHvXB5fX\nNWKjxm3AyVohYAurURsyYIu4AjU8gObY9EYSJQ5hzHyJMwSv0wZXNODG/joe5vRT\ne0ASvNSUvaB4pPT/UjwEixK33apeQXF/0Pmphytlbysei5rRPWIBpDH+CkmMNkPd\nKvM79svAeSo/wOBA88ov5Nxb\n-----END PRIVATE KEY-----\n",
      }),
    });
  } catch (err) {
    if (!/already exists/u.test(err.message)) {
      console.error('Firebase Admin Error: ', err.stack)
    }
  }


export const adminDB = getFirestore();
export const adminAuth = getAuth();