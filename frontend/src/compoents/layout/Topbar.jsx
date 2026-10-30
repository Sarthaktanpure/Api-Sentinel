import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Topbar() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  return (
    <header className="topbar">
      <div className="top-search">
        ⌕ <span>Search endpoints...</span>
        <kbd>Ctrl + K</kbd>
      </div>

      <div className="top-actions">
        <button className="environment">
          <i /> Development⌄
        </button>

        <button className="icon-button">
          ♧<em>2</em>
        </button>

        <button className="rounded-full ...">
          {user.name ? user.name : "Get Started"}
        </button>
      </div>
    </header>
  );
}
