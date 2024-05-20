# Whisperwave

Wor-k-lock is an online space booking site that allows users to book spaces in the nearest cafes. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides a seamless experience for finding and reserving spots in cafes. Cloudinary is used for managing and storing images. Additionally, Wor-k-lock includes an admin panel to manage all bookings and cafes.

## Features

- Book your space anytime anywhere
- User authentication and authorization
- Responsive design for mobile and desktop users
- Cloudinary integration for image handling
- Admin Panel for Manage bookings and cafes

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Management**: Cloudinary
- **Authentication**: JWT, bcrypt
- **Styling**: CSS

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krazio-01/worklock.git
   cd worklock

2. **Install dependencies**
   ```bash
   cd server
   npm install
   cd ../client
   npm install

3. **Set up environment variables**
   set up environment variables using ".env copy" file by renaming it to ".env" and passing correct values

4. **Start the application**
   1. Terminal for Backend
      ```bash
      cd server
      nodemon index.js
    2. Terminal for frontend
       ```bash
       cd ../client
       npm run dev

5. **Access Application at this url**
Open your browser and navigate to http://localhost:5173.

## Usage
1. Register an account or log in if you already have one.
2. Browse available spaces in your nearest cafes.
3. Select a space and view its details.
4. Book the space for your desired time.

## Admin Panel
1. Log in with an admin account.
2. Access the admin panel from the Profile.
3. Manage all bookings
   - View All bookings made with full user information and time
4. Manage Cafes
   - Add new Cafes
   - Remove Cafes
   - Upload and manage images using Cloudinary

## Contributions
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the coding guidelines and include relevant tests.

## Contact
For any inquiries, please contact:

- Name: Mohd Amman
- Email: md.krazio@gmail.com
- GitHub: krazio-01
