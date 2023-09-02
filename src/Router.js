import React from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home />
                        }
                    />
                    <Route
                        path="/auth"
                        element={
                            <Auth />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;