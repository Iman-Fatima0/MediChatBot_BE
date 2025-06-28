const crypto = require('crypto');
const MedicalRecord = require('../models/Record');

const algorithm = 'aes-256-cbc';
const secretKey = '12345678901234567890123456789012'; // 32 chars key
const iv = crypto.randomBytes(16);

// Encrypt helper
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt helper
function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Create record
exports.createRecord = async (req, res) => {
  try {
    const encryptedData = encrypt(JSON.stringify(req.body.data));
    const record = new MedicalRecord({ userId: req.body.userId, data: encryptedData });
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Could not create record' });
  }
};

// Get records by user
exports.getRecordsByUser = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ userId: req.params.userId });
    // Decrypt each record's data
    const decryptedRecords = records.map(record => {
      return {
        _id: record._id,
        userId: record.userId,
        data: JSON.parse(decrypt(record.data)),
        createdAt: record.createdAt
      };
    });
    res.json(decryptedRecords);
  } catch (error) {
    res.status(500).json({ error: 'Fetch error' });
  }
};

// Update record
exports.updateRecord = async (req, res) => {
  try {
    const encryptedData = encrypt(JSON.stringify(req.body.data));
    const updated = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      { data: encryptedData },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Update error' });
  }
};

// Delete record
exports.deleteRecord = async (req, res) => {
  try {
    await MedicalRecord.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete error' });
  }
};
