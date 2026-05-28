"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Loading & feedback states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'service', 'job', 'blog'
  const [modalAction, setModalAction] = useState(""); // 'add', 'edit'
  const [currentItem, setCurrentItem] = useState(null);

  // Form input states
  // Service
  const [serviceId, setServiceId] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceIcon, setServiceIcon] = useState("globe");

  // Job
  const [jobTitle, setJobTitle] = useState("");
  const [jobDept, setJobDept] = useState("");
  const [jobLoc, setJobLoc] = useState("");
  const [jobExp, setJobExp] = useState("");
  const [jobQual, setJobQual] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [jobDesc, setJobDesc] = useState("");
  const [jobReqs, setJobReqs] = useState("");

  // Blog
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("Technology");
  const [blogAuthor, setBlogAuthor] = useState("Ananya Hi Solutions");
  const [blogCoverImage, setBlogCoverImage] = useState("");

  // Authorization Check
  useEffect(() => {
    const token = localStorage.getItem("ananya_admin_token");
    if (token !== "ananya-secure-admin-token-2026") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
      fetchData();
    }
  }, [router]);

  // Fetch all databases
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [resServices, resJobs, resBlogs] = await Promise.all([
        fetch("/api/services"),
        fetch("/api/jobs"),
        fetch("/api/blogs"),
      ]);

      if (!resServices.ok || !resJobs.ok || !resBlogs.ok) {
        throw new Error("Failed to load some resources.");
      }

      const [dataServices, dataJobs, dataBlogs] = await Promise.all([
        resServices.json(),
        resJobs.json(),
        resBlogs.json(),
      ]);

      setServices(dataServices);
      setJobs(dataJobs);
      setBlogs(dataBlogs);
    } catch (err) {
      setError("Error syncing with local database. Please refresh.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper for auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("ananya_admin_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Show Toast
  const showToast = (message, isSuccess = true) => {
    if (isSuccess) {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 4000);
    } else {
      setError(message);
      setTimeout(() => setError(""), 5000);
    }
  };

  // Handlers for deleting items
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you absolutely sure you want to delete this ${type}?`)) return;
    
    setActionLoading(true);
    try {
      const response = await fetch(`/api/${type}s?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
        fetchData();
      } else {
        showToast(data.error || `Failed to delete ${type}`, false);
      }
    } catch (err) {
      showToast(`Network error deleting ${type}`, false);
    } finally {
      setActionLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("ananya_admin_token");
    router.push("/admin/login");
  };

  // Modal controls
  const openModal = (type, action, item = null) => {
    setModalType(type);
    setModalAction(action);
    setCurrentItem(item);
    setError("");

    if (action === "edit" && item) {
      if (type === "service") {
        setServiceId(item.id);
        setServiceTitle(item.title);
        setServiceDesc(item.desc);
        setServiceIcon(item.iconName || "globe");
      } else if (type === "job") {
        setJobTitle(item.title);
        setJobDept(item.department);
        setJobLoc(item.location);
        setJobExp(item.experience);
        setJobQual(item.qualifications || "");
        setJobType(item.type);
        setJobDesc(item.description);
        setJobReqs(item.requirements ? item.requirements.join("\n") : "");
      } else if (type === "blog") {
        setBlogTitle(item.title);
        setBlogSummary(item.summary);
        setBlogContent(item.content);
        setBlogCategory(item.category);
        setBlogAuthor(item.author || "Ananya Hi Solutions");
        setBlogCoverImage(item.coverImage || "");
      }
    } else {
      // Clear forms for Add action
      if (type === "service") {
        setServiceId("");
        setServiceTitle("");
        setServiceDesc("");
        setServiceIcon("globe");
      } else if (type === "job") {
        setJobTitle("");
        setJobDept("");
        setJobLoc("");
        setJobExp("");
        setJobQual("");
        setJobType("Full-Time");
        setJobDesc("");
        setJobReqs("");
      } else if (type === "blog") {
        setBlogTitle("");
        setBlogSummary("");
        setBlogContent("");
        setBlogCategory("Technology");
        setBlogAuthor("Ananya Hi Solutions");
        setBlogCoverImage("");
      }
    }

    setIsModalOpen(true);
  };

  // Load dynamic scripts (e.g. mammoth, pdfjs)
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  };

  // Handle parsing PDF/DOCX
  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.name.split('.').pop().toLowerCase();
    showToast("Extracting document text...", true);

    try {
      if (fileType === "docx") {
        if (!window.mammoth) {
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js");
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          window.mammoth.extractRawText({ arrayBuffer: arrayBuffer })
            .then((result) => {
              const text = result.value;
              setBlogContent(text);
              // Auto-fill summary helper
              const trimmed = text.replace(/\s+/g, ' ').trim();
              setBlogSummary(trimmed.slice(0, 180) + (trimmed.length > 180 ? "..." : ""));
              showToast("Successfully extracted .docx content!", true);
            })
            .catch((err) => {
              showToast("Error parsing docx content", false);
              console.error(err);
            });
        };
        reader.readAsArrayBuffer(file);
      } else if (fileType === "pdf") {
        if (!window['pdfjs-dist/build/pdf']) {
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js");
        }
        
        const reader = new FileReader();
        reader.onload = async (event) => {
          const typedarray = new Uint8Array(event.target.result);
          const pdfjsLib = window['pdfjs-dist/build/pdf'];
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
          
          try {
            const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
            let fullText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item) => item.str).join(" ");
              fullText += pageText + "\n";
            }
            setBlogContent(fullText);
            // Auto-fill summary helper
            const trimmed = fullText.replace(/\s+/g, ' ').trim();
            setBlogSummary(trimmed.slice(0, 180) + (trimmed.length > 180 ? "..." : ""));
            showToast("Successfully extracted .pdf content!", true);
          } catch (err) {
            showToast("Error extracting PDF text pages", false);
            console.error(err);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (err) {
      showToast("Error loading parsing libraries", false);
      console.error(err);
    }
  };

  // Handle image uploading & conversion to base64
  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setBlogCoverImage(event.target.result);
      showToast("Cover image loaded successfully!", true);
    };
    reader.onerror = () => {
      showToast("Failed to read cover image file", false);
    };
    reader.readAsDataURL(file);
  };

  // Form Submit Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError("");

    let payload = {};
    let url = `/api/${modalType}s`;
    let method = modalAction === "edit" ? "PUT" : "POST";

    if (modalType === "service") {
      payload = {
        id: serviceId.trim().toLowerCase().replace(/\s+/g, "-"),
        title: serviceTitle,
        desc: serviceDesc,
        iconName: serviceIcon,
      };
      if (modalAction === "edit") {
        payload.id = currentItem.id; // Keep original ID
      }
    } else if (modalType === "job") {
      const requirementsArray = jobReqs
        .split("\n")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      payload = {
        title: jobTitle,
        department: jobDept,
        location: jobLoc,
        experience: jobExp,
        qualifications: jobQual,
        type: jobType,
        description: jobDesc,
        requirements: requirementsArray,
      };

      if (modalAction === "edit") {
        payload.id = currentItem.id;
      }
    } else if (modalType === "blog") {
      payload = {
        title: blogTitle,
        summary: blogSummary,
        content: blogContent,
        category: blogCategory,
        author: blogAuthor || "Ananya Hi Solutions",
        coverImage: blogCoverImage,
      };

      if (modalAction === "edit") {
        payload.id = currentItem.id;
        payload.date = currentItem.date; // Preserve date
      }
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.service || data.job || data.blog)) {
        showToast(
          `${modalType.charAt(0).toUpperCase() + modalType.slice(1)} ${
            modalAction === "edit" ? "updated" : "created"
          } successfully!`
        );
        setIsModalOpen(false);
        fetchData();
      } else {
        setError(data.error || `Failed to save changes to database.`);
      }
    } catch (err) {
      setError(`Server or network error occurred during saving.`);
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="admin-loading-screen">
        <span className="spinner-dashboard"></span>
        <p>Verifying secure credentials...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Success/Error Toast notification top right */}
      {successMessage && (
        <div className="admin-toast success">
          <span className="toast-icon">✨</span>
          <p>{successMessage}</p>
        </div>
      )}
      {error && !isModalOpen && (
        <div className="admin-toast error">
          <span className="toast-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* 1. Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img
            src="/logo.png"
            alt="Ananya Hi Solutions"
            className="admin-sidebar-logo"
          />
          <span className="admin-sidebar-badge">CONTROL PANEL</span>
        </div>

        <nav className="admin-sidebar-nav">
          <button
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="nav-icon">📊</span> Overview
          </button>
          <button
            className={`admin-nav-item ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            <span className="nav-icon">🌐</span> Services List
          </button>
          <button
            className={`admin-nav-item ${activeTab === "careers" ? "active" : ""}`}
            onClick={() => setActiveTab("careers")}
          >
            <span className="nav-icon">💼</span> Careers / Jobs
          </button>
          <button
            className={`admin-nav-item ${activeTab === "blogs" ? "active" : ""}`}
            onClick={() => setActiveTab("blogs")}
          >
            <span className="nav-icon">📰</span> News & Blogs
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <h4>Administrator</h4>
              <p>Security Level: Full</p>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Main Dashboard Content Panel */}
      <main className="admin-main-panel">
        <header className="admin-main-header">
          <div className="header-breadcrumbs">
            <span>Admin</span> / <span className="active-breadcrumb">{activeTab}</span>
          </div>
          <div className="header-actions">
            <Link href="/" target="_blank" className="admin-btn btn-view-site">
              ← Visit Frontend Site
            </Link>
          </div>
        </header>

        {loading ? (
          <div className="admin-tab-loading">
            <span className="spinner-dashboard"></span>
            <p>Syncing local JSON database files...</p>
          </div>
        ) : (
          <div className="admin-tab-content animate-fade-in">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="dashboard-overview">
                <div className="overview-welcome-card">
                  <div className="welcome-text">
                    <h1>Welcome back, Web Expert! 👋</h1>
                    <p>
                      Easily edit, add, or delete the dynamic content on Ananya Hi Solutions homepage in real-time. No code-level changes needed.
                    </p>
                  </div>
                  <div className="welcome-decor">📂</div>
                </div>

                <div className="overview-stats-grid">
                  <div className="stat-card card-blue" onClick={() => setActiveTab("services")}>
                    <div className="stat-icon">🌐</div>
                    <div className="stat-value">{services.length}</div>
                    <div className="stat-label">Services Provided</div>
                    <span className="stat-link">Manage services →</span>
                  </div>

                  <div className="stat-card card-orange" onClick={() => setActiveTab("careers")}>
                    <div className="stat-icon">💼</div>
                    <div className="stat-value">{jobs.length}</div>
                    <div className="stat-label">Active Career Listings</div>
                    <span className="stat-link">Manage job openings →</span>
                  </div>

                  <div className="stat-card card-purple" onClick={() => setActiveTab("blogs")}>
                    <div className="stat-icon">📰</div>
                    <div className="stat-value">{blogs.length}</div>
                    <div className="stat-label">Published Blog Posts</div>
                    <span className="stat-link">Manage blog articles →</span>
                  </div>
                </div>

                <div className="overview-meta-section">
                  <div className="integrity-card">
                    <h3>🛡️ System & Database Integrity</h3>
                    <div className="integrity-status-list">
                      <div className="status-item">
                        <span className="status-dot green"></span>
                        <div className="status-info">
                          <h5>Database Connectivity</h5>
                          <p>FS-Persisted JSON storage active and safe</p>
                        </div>
                      </div>
                      <div className="status-item">
                        <span className="status-dot green"></span>
                        <div className="status-info">
                          <h5>Write & Read Access</h5>
                          <p>Perfect authorization permissions inside /src/data/db.json</p>
                        </div>
                      </div>
                      <div className="status-item">
                        <span className="status-dot green"></span>
                        <div className="status-info">
                          <h5>Next.js Development Framework</h5>
                          <p>App Router, Client & Server side syncing active</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="quick-actions-card">
                    <h3>⚡ Quick Database Actions</h3>
                    <div className="quick-actions-grid">
                      <button className="q-action-btn" onClick={() => openModal("service", "add")}>
                        ➕ Add Service Card
                      </button>
                      <button className="q-action-btn" onClick={() => openModal("job", "add")}>
                        💼 Post Career Opening
                      </button>
                      <button className="q-action-btn" onClick={() => openModal("blog", "add")}>
                        ✍️ Publish Blog Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES LIST TAB */}
            {activeTab === "services" && (
              <div className="dashboard-tab-panel">
                <div className="panel-header">
                  <div className="panel-title-desc">
                    <h2>Core Business Services</h2>
                    <p>These services display on the main home page under 'Our Core Services'</p>
                  </div>
                  <button className="admin-btn btn-primary-custom" onClick={() => openModal("service", "add")}>
                    ➕ Add Service Card
                  </button>
                </div>

                <div className="panel-table-wrapper">
                  <table className="panel-table">
                    <thead>
                      <tr>
                        <th>Icon</th>
                        <th>Unique ID</th>
                        <th>Service Title</th>
                        <th>Description (Summary)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="table-empty-row">No services found in database. Add one to begin.</td>
                        </tr>
                      ) : (
                        services.map((item) => (
                          <tr key={item.id}>
                            <td className="cell-icon">
                              <span className="icon-badge">{item.iconName ? `🎨 ${item.iconName}` : "🌐"}</span>
                            </td>
                            <td className="cell-id"><code>{item.id}</code></td>
                            <td className="cell-title font-bold">{item.title}</td>
                            <td className="cell-desc">{item.desc}</td>
                            <td className="cell-actions">
                              <button className="btn-action edit" onClick={() => openModal("service", "edit", item)}>
                                ✏️ Edit
                              </button>
                              <button className="btn-action delete" onClick={() => handleDelete("service", item.id)} disabled={actionLoading}>
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CAREERS / JOBS TAB */}
            {activeTab === "careers" && (
              <div className="dashboard-tab-panel">
                <div className="panel-header">
                  <div className="panel-title-desc">
                    <h2>Active Career Postings</h2>
                    <p>These openings display in the Careers section on the frontend home page</p>
                  </div>
                  <button className="admin-btn btn-primary-custom" onClick={() => openModal("job", "add")}>
                    💼 Post Career Opening
                  </button>
                </div>

                <div className="panel-table-wrapper">
                  <table className="panel-table">
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Location</th>
                        <th>Job Type</th>
                        <th>Experience</th>
                        <th>Qualifications</th>
                        <th>Requirements</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="table-empty-row">No active job postings found. Create one.</td>
                        </tr>
                      ) : (
                        jobs.map((item) => (
                          <tr key={item.id}>
                            <td className="cell-title font-bold">{item.title}</td>
                            <td className="cell-badge">
                              <span className="badge-dept">{item.department}</span>
                            </td>
                            <td>{item.location}</td>
                            <td className="cell-badge">
                              <span className="badge-type">{item.type}</span>
                            </td>
                            <td>{item.experience}</td>
                            <td>{item.qualifications || "N/A"}</td>
                            <td className="cell-desc">
                              {item.requirements ? `${item.requirements.length} item(s)` : "0 items"}
                            </td>
                            <td className="cell-actions">
                              <button className="btn-action edit" onClick={() => openModal("job", "edit", item)}>
                                ✏️ Edit
                              </button>
                              <button className="btn-action delete" onClick={() => handleDelete("job", item.id)} disabled={actionLoading}>
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* NEWS & BLOGS TAB */}
            {activeTab === "blogs" && (
              <div className="dashboard-tab-panel">
                <div className="panel-header">
                  <div className="panel-title-desc">
                    <h2>News & Published Articles</h2>
                    <p>Publish helpful SEO content and press releases directly to the blog home section</p>
                  </div>
                  <button className="admin-btn btn-primary-custom" onClick={() => openModal("blog", "add")}>
                    ✍️ Publish Blog Article
                  </button>
                </div>

                <div className="panel-table-wrapper">
                  <table className="panel-table">
                    <thead>
                      <tr>
                        <th>Article Title</th>
                        <th>Category</th>
                        <th>Publish Date</th>
                        <th>Author</th>
                        <th>Summary</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="table-empty-row">No published blog posts. Write your first article today.</td>
                        </tr>
                      ) : (
                        blogs.map((item) => (
                          <tr key={item.id}>
                            <td className="cell-title font-bold">{item.title}</td>
                            <td className="cell-badge">
                              <span className="badge-cat">{item.category}</span>
                            </td>
                            <td>{item.date}</td>
                            <td>{item.author}</td>
                            <td className="cell-desc">{item.summary}</td>
                            <td className="cell-actions">
                              <button className="btn-action edit" onClick={() => openModal("blog", "edit", item)}>
                                ✏️ Edit
                              </button>
                              <button className="btn-action delete" onClick={() => handleDelete("blog", item.id)} disabled={actionLoading}>
                                🗑️ Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 3. Sliding Glassmorphic Form Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card glassmorphic-modal animate-slide-up">
            <div className="modal-header">
              <h3>
                {modalAction === "edit" ? "✏️ Edit" : "➕ Add New"}{" "}
                {modalType === "service" && "Service Card"}
                {modalType === "job" && "Career Posting"}
                {modalType === "blog" && "News/Blog Article"}
              </h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            {error && (
              <div className="modal-error-alert">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="modal-form">
              {/* SERVICE FIELDS */}
              {modalType === "service" && (
                <>
                  {modalAction === "add" && (
                    <div className="modal-form-group">
                      <label htmlFor="serv-id">Unique Service ID (Slug)</label>
                      <input
                        id="serv-id"
                        type="text"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        placeholder="e.g. cloud-computing"
                        required
                      />
                      <small>Lowercase, letters, numbers, and dashes only. Fixed once created.</small>
                    </div>
                  )}

                  <div className="modal-form-group">
                    <label htmlFor="serv-title">Service Title</label>
                    <input
                      id="serv-title"
                      type="text"
                      value={serviceTitle}
                      onChange={(e) => setServiceTitle(e.target.value)}
                      placeholder="e.g. Cloud Architecture Solutions"
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="serv-icon">Service Icon Vector Class</label>
                    <select
                      id="serv-icon"
                      value={serviceIcon}
                      onChange={(e) => setServiceIcon(e.target.value)}
                    >
                      <option value="globe">🌐 globe (Web Design)</option>
                      <option value="trending-up">📈 trending-up (Marketing)</option>
                      <option value="smartphone">📱 smartphone (Mobile App)</option>
                      <option value="shopping-cart">🛒 shopping-cart (eCommerce)</option>
                      <option value="video">🎥 video (Video Production)</option>
                      <option value="code">💻 code (Software Dev)</option>
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="serv-desc">Description Summary</label>
                    <textarea
                      id="serv-desc"
                      value={serviceDesc}
                      onChange={(e) => setServiceDesc(e.target.value)}
                      placeholder="Enter a stunning high-converting description card text..."
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </>
              )}

              {/* JOB FIELDS */}
              {modalType === "job" && (
                <>
                  <div className="modal-form-row">
                    <div className="modal-form-group flex-1">
                      <label htmlFor="job-title">Job Title</label>
                      <input
                        id="job-title"
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. senior flutter engineer"
                        required
                      />
                    </div>
                    <div className="modal-form-group flex-1">
                      <label htmlFor="job-dept">Department</label>
                      <input
                        id="job-dept"
                        type="text"
                        value={jobDept}
                        onChange={(e) => setJobDept(e.target.value)}
                        placeholder="e.g. Engineering, Marketing"
                        required
                      />
                    </div>
                  </div>

                  <div className="modal-form-row">
                    <div className="modal-form-group flex-1">
                      <label htmlFor="job-loc">Location</label>
                      <input
                        id="job-loc"
                        type="text"
                        value={jobLoc}
                        onChange={(e) => setJobLoc(e.target.value)}
                        placeholder="e.g. Begumpet, Hyderabad (On-site)"
                        required
                      />
                    </div>
                    <div className="modal-form-group flex-1">
                      <label htmlFor="job-exp">Experience Level</label>
                      <input
                        id="job-exp"
                        type="text"
                        value={jobExp}
                        onChange={(e) => setJobExp(e.target.value)}
                        placeholder="e.g. 2-4 Years, Freshers"
                        required
                      />
                    </div>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="job-qual">Qualifications Required</label>
                    <input
                      id="job-qual"
                      type="text"
                      value={jobQual}
                      onChange={(e) => setJobQual(e.target.value)}
                      placeholder="e.g. B.Tech, MCA, MBA or equivalent degree"
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="job-type">Employment Type</label>
                    <select
                      id="job-type"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <option value="Full-Time">Full-Time (Begumpet HQ)</option>
                      <option value="Part-Time">Part-Time / Intern</option>
                      <option value="Contract">Contract / Remote</option>
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="job-desc">Job Overview & Description</label>
                    <textarea
                      id="job-desc"
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      placeholder="Describe the candidate's responsibilities and overall role overview..."
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="job-reqs">Candidate Requirements (One per line)</label>
                    <textarea
                      id="job-reqs"
                      value={jobReqs}
                      onChange={(e) => setJobReqs(e.target.value)}
                      placeholder="e.g. Robust experience with React Native.&#10;Excellent communication skills.&#10;Familiarity with REST APIs."
                      rows="4"
                    ></textarea>
                    <small>Separate each criteria point by pressing Enter.</small>
                  </div>
                </>
              )}

              {/* BLOG FIELDS */}
              {modalType === "blog" && (
                <>
                  <div className="modal-form-group">
                    <label htmlFor="blog-title">Article Title</label>
                    <input
                      id="blog-title"
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. How Web Designs Influence E-commerce Revenue"
                      required
                    />
                  </div>

                  <div className="modal-form-row">
                    <div className="modal-form-group flex-1">
                      <label htmlFor="blog-cover">Cover Image URL</label>
                      <input
                        id="blog-cover"
                        type="text"
                        value={blogCoverImage}
                        onChange={(e) => setBlogCoverImage(e.target.value)}
                        placeholder="e.g. /images/hero/digital-marketing.png"
                      />
                    </div>
                    <div className="modal-form-group flex-1">
                      <label htmlFor="blog-cover-file">Upload Cover Image</label>
                      <input
                        id="blog-cover-file"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="file-input-custom"
                        style={{
                          padding: "6px",
                          border: "1px dashed rgba(15, 117, 188, 0.3)",
                          borderRadius: "var(--radius-sm)",
                          background: "rgba(15, 117, 188, 0.02)",
                          fontSize: "12px",
                          color: "#334155"
                        }}
                      />
                    </div>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="blog-doc-file">Upload Content File (.docx or .pdf)</label>
                    <input
                      id="blog-doc-file"
                      type="file"
                      accept=".docx,.pdf"
                      onChange={handleDocumentUpload}
                      className="file-input-custom"
                      style={{
                        padding: "8px",
                        border: "1px dashed #ea580c",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(234, 88, 12, 0.02)",
                        fontSize: "12px",
                        color: "#334155"
                      }}
                    />
                    <small style={{ color: "#475569", marginTop: "4px", display: "block", fontSize: "11px" }}>
                      Selecting a document will extract its plain text directly into the article content box below.
                    </small>
                  </div>

                  <div className="modal-form-row">
                    <div className="modal-form-group flex-1">
                      <label htmlFor="blog-cat">Category</label>
                      <input
                        id="blog-cat"
                        type="text"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        placeholder="e.g. Technology, Digital Marketing"
                        required
                      />
                    </div>
                    <div className="modal-form-group flex-1">
                      <label htmlFor="blog-author">Author Name</label>
                      <input
                        id="blog-author"
                        type="text"
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        placeholder="e.g. Senior SEO Consultant"
                        required
                      />
                    </div>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="blog-sum">Article Summary / Card Snippet</label>
                    <textarea
                      id="blog-sum"
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      placeholder="A short engaging teaser showing in the card list grid..."
                      rows="2"
                      required
                    ></textarea>
                  </div>

                  <div className="modal-form-group">
                    <label htmlFor="blog-content">Full Article Content (Markdown or HTML support)</label>
                    <textarea
                      id="blog-content"
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Write your detailed high-fidelity news or SEO strategies here..."
                      rows="8"
                      required
                    ></textarea>
                  </div>
                </>
              )}

              <div className="modal-actions-buttons">
                <button
                  type="button"
                  className="modal-btn btn-cancel-custom"
                  onClick={() => setIsModalOpen(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`modal-btn btn-save-custom ${actionLoading ? "loading" : ""}`}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <span className="spinner-save"></span>
                  ) : (
                    "💾 Save to Database"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
