import Content from "./content";
import Sidebar from "./sidebar";

export default function Container({ children }) {
  return (
    <div className="page-container">
      <aside className="page-sidebar">
        <Sidebar />
      </aside>
      <main className="page-content">
        <Content />
      </main>
    </div>
  );
}
