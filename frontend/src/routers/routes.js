import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRouter";


const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const About = lazy(() => import('../pages/about'));
const Table = lazy(() => import('../pages/table'));
const Inventory = lazy(() => import('../pages/inventory'));
const Contact = lazy(() => import('../pages/contact'));
const Contact_me = lazy(() => import('../pages/contact_me'));
const Bill = lazy(() => import('../pages/bill'));
const KOT = lazy(() => import('../pages/kot'));
const SPEED = lazy(() => import('../pages/speed'))



const Navigate = () => {
  return (
    <Routes>
        <Route exact path="/login" element={<Suspense fallback= {<div>Loading...</div>} ><Login /></Suspense>} />
        <Route exact path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        <Route exact path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
        <Route exact path="/contact" element={<Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>} />
        <Route exact path="/contact_me" element={<Suspense fallback={<div>Loading...</div>}><Contact_me /></Suspense>} />
        <Route element={<ProtectedRoute token={localStorage.getItem('token')} />} >                                  
        <Route exact path="/table" element={<Suspense fallback={<div>Loading...</div>}><Table /></Suspense>} />
        <Route exact path="/inventory/:table_id" element={<Suspense fallback={<div>Loading...</div>}><Inventory /></Suspense>} />
        <Route exact path="/bill" element={<Suspense fallback={<div>Loading...</div>}><Bill /></Suspense>} />
        <Route exact path="/kot" element={<Suspense fallback={<div>Loading...</div>}><KOT /></Suspense>} />
        <Route exact path="/speed" element={<Suspense fallback={<div>Loading...</div>}><SPEED /></Suspense>} />
        </Route>
    </Routes>
  );
};

export default Navigate;