import Booking from '../models/Booking.js';

export const listBookings = async (req, res, next) => {
  try {
    const {
      page = 1, limit = 10,
      serviceType, status, carType,
      startDate, endDate,
      sortBy
    } = req.query;

    const filters = {};
    if (serviceType) filters.serviceType = serviceType;
    if (status) filters.status = status;
    if (carType) filters['carDetails.type'] = carType;
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = Booking.find(filters);

    if (sortBy) {
      const sortObj = {};
      sortBy.split(',').forEach(s => {
        if (!s) return;
        sortObj[s.startsWith('-') ? s.slice(1) : s] = s.startsWith('-') ? -1 : 1;
      });
      query = query.sort(sortObj);
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const total = await Booking.countDocuments(filters);
    const bookings = await query.skip(skip).limit(parseInt(limit)).lean();

    res.json({ success: true, data: bookings, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) {
    next(err);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).lean();
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, data: {}, message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

export const searchBookings = async (req, res, next) => {
  try {
    const { q = '', page = 1, limit = 10 } = req.query;
    if (!q) return res.json({ success: true, data: [], meta: { total: 0 } });

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter = { $text: { $search: q } };

    const total = await Booking.countDocuments(filter);
    const data = await Booking.find(filter).skip(skip).limit(parseInt(limit)).lean();

    res.json({ success: true, data, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) {
    next(err);
  }
};
