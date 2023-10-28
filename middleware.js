module.exports.validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === 'abcd-efgh-ijlk-1234') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
};