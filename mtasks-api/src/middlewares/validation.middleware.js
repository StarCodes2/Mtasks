const { validationResult } = require('express-validator');

const validate = (schema) => (req, res, next) => {
  Promise.all(schema.map((validation) => validation.run(req))).then(() => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     next();
   });
};

module.exports = validate;