const Appointment = require('../models/Appointment');

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Could not create appointment' });
  }
};

// Get appointments by user
exports.getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Fetch error' });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Update error' });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete error' });
  }
};
