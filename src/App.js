// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ClassementTable from './ClassementTable'; // Assurez-vous d'importer correctement votre composant

// function App() {
//   return (
//     <Router>
//       <div>
//         {/* Menu de navigation */}
//         <nav>
//           <Link to="/">Accueil</Link> | 
//           <Link to="/classement">Classement</Link>
//         </nav>

//         {/* Routes */}
//         <Routes>
//           <Route path="/" element={<h1>Page d'accueil</h1>} />
//           <Route path="/classement" element={<ClassementTable />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// import ClassementTable from './ClassementTable';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav className="nav">
//           <div className="nav__content">
//             <NavLink 
//               to="/"
//               className={({ isActive }) => 
//                 `nav__link ${isActive ? 'nav__link--active' : ''}`
//               }
//             >
//               Accueil
//             </NavLink>
            
//             <NavLink 
//               to="/classement"
//               className={({ isActive }) => 
//                 `nav__link ${isActive ? 'nav__link--active' : ''}`
//               }
//             >
//               Classements
//             </NavLink>
//           </div>
//         </nav>

//         <Routes>
//           <Route path="/" element={<h1>Page d'accueil</h1>} />
//           <Route path="/classement" element={<ClassementTable />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ClassementTable from './ClassementTable';
import HomePage from './HomePage'; // Importez le nouveau composant
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <div className="nav__content">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `nav__link ${isActive ? 'nav__link--active' : ''}`
              }
            >
              Accueil
            </NavLink>
            
            <NavLink 
              to="/classement"
              className={({ isActive }) => 
                `nav__link ${isActive ? 'nav__link--active' : ''}`
              }
            >
              Classement
            </NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classement" element={<ClassementTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;