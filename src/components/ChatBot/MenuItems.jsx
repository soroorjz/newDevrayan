import React from 'react'
import { motion } from "framer-motion";

const MenuItems = ({menuItems,
    setHoveredItem,
    isOpen,
    hoveredItem}) => {
  return (
    <div className="menu-items">
    {menuItems.map((item, index) => (
      <div
        key={item.key}
        className="menu-item-container"
        onMouseEnter={() => setHoveredItem(item.key)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
          transition={{ duration: 0.3, delay: isOpen ? index * 0.1 : 0 }}
          className="menu-item"
          onClick={item.action ? item.action : undefined}
        >
          {item.icon}
        </motion.button>

        {isOpen && hoveredItem === item.key && (
          <motion.div
            className="tooltip"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.label}
          </motion.div>
        )}
      </div>
    ))}
  </div>
  )
}

export default MenuItems
