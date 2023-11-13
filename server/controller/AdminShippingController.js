const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const AdminShippingController = {
 
    registerShipping: async (req, res) => {
        try {
         
          const { name, email, password, city, address, phonenumber ,  } = req.body;
      
          const hashedPassword = await bcrypt.hash(password, 10);

          const newShippingUnit = await prisma.shippingUnit.create({
            data: {
              name,
              email,
              password: hashedPassword,
              city,
              address,
              phonenumber,

            },
          });
      
          return res.status(201).json(newShippingUnit);
        } catch (error) {
          console.error('loi', error);
          return res.status(500).json({ error: 'Server Error' });
        }
      },
      
      
      

  
};

module.exports = AdminShippingController;
