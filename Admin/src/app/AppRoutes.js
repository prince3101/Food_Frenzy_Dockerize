import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from './shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Service = lazy(() => import('./Service/index'));
const EmployeeList = lazy(() => import('./Employee/index'));
const AddEmployee = lazy(() => import('./Employee/addEmployee'));
const CategoryList = lazy(() => import('./Category/index'));
const AddCategory = lazy(() => import('./Category/addCategory'));
const AddService = lazy(() => import('./Service/addService'));
const Users = lazy(() => import('./Users/index'))
const Appointments = lazy(() => import('./Appointment/index'))
const Slots = lazy(() => import('./Slots/index'))
const AddSlots = lazy(() => import('./Slots/createSlot'))
const Portfolio = lazy(() => import('./Portfolio/index'))
const AddPhoto = lazy(() => import('./Portfolio/addPhoto'))
const Login = lazy(() => import('./Auth/Login'));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/service" component={Service} />
          <Route exact path="/add-service" component={AddService} />
          <Route exact path="/edit-service/:id" component={AddService} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/employee/:id" component={AddEmployee} />
          <Route exact path="/employee" component={EmployeeList} />
          <Route exact path="/category" component={CategoryList} />
          <Route exact path="/add-category" component={AddCategory} />
          <Route exact path="/category/:id" component={AddCategory} />
          <Route exact path="/appointment" component={Appointments} />
          <Route exact path="/slots" component={Slots} />
          <Route exact path="/add-slots" component={AddSlots} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/add-photo" component={AddPhoto} />
          <Route path="/" component={Login} />


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;