import React from 'react';

const Sidebar = ({ navLinks, activeView, setActiveView }) => {
    return (
        <aside className="w-64 bg-teal-800 text-white flex flex-col shrink-0 h-screen sticky top-0">
            <div className="p-6 text-2xl font-bold border-b border-teal-700">Globe Allied</div>
            <nav className="flex-1 p-4 space-y-2">
                {navLinks.map((link) => (
                    <a
                        key={link.id}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveView(link.id);
                        }}
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                            activeView === link.id ? 'bg-teal-600 font-semibold' : 'hover:bg-teal-700'
                        }`}
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
            <div className="p-4 border-t border-teal-700">
                <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-teal-700">
                    Logout
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
