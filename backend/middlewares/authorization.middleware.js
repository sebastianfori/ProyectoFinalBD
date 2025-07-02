
function authorize(role) {
  return (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Check if the user has the required role
    if (req.user.usuario.tipo !== role) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    // If the user is authorized, proceed to the next middleware or route handler  
    next();
    };
}   
module.exports = {
  authorize,
};