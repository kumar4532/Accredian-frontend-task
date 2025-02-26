import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function App() {
  const [formData, setFormData] = useState({
    refereeEmail: "",
    refereeName: "",
    referralLink: "https://your-referral-link.com",
    referrerEmail: "",
    referrerName: "",
  });

  console.log(formData);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/refer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      console.log(data);

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(data.message)
      setFormData({ refereeEmail: "", refereeName: "", referralLink: "https://example.com/refer", referrerEmail: "", referrerName: "" });
    } catch (error) {
      toast.error(error.message)
    }

    document.getElementById("my_modal_2").close();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      {/* Top Banner */}
      <div className="bg-[#EDF3FF] px-4 py-2 text-center text-sm">
        <span>Navigate your ideal career path with tailored expert advice</span>
        <Link to="/" className="ml-2 text-blue-600 hover:underline">
          Contact Expert
        </Link>
      </div>

      {/* Navigation */}
      <header className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold">accredian</Link>
          <button className="text-gray-600">Courses <span className="ml-1">▼</span></button>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Refer & Earn</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">Resources</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">About Us</Link>
          <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Try for free
          </button>
        </nav>
      </header>

      <div className="container mx-auto px-4">
        <nav className="mx-auto mt-4 flex max-w-md justify-between rounded-full bg-[#EDF3FF] p-1">
          {["Refer", "Benefits", "FAQs", "Support"].map((item, index) => (
            <button
              key={item}
              className={`rounded-full px-6 py-2 text-sm ${index === 0 ? "bg-white shadow-sm" : "text-gray-600 hover:bg-white/50"
                }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Hero Section */}
      <div className="w-2/3 relative mx-auto mt-8 overflow-hidden rounded-3xl bg-[#cfdcff] px-4 py-8 md:mt-12 shadow-inherit">
        <div className="relative z-10 flex flex-row justify-evenly items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Let's Learn<br />& Earn
            </h1>
            <p className="mt-6 text-lg">
              Get a chance to win<br />
              up to <span className="text-blue-600">Rs. 15,000</span>
            </p>
            <button
              className="btn mt-8 bg-blue-600 text-white px-8 py-4 text-lg rounded-lg hover:bg-blue-700"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Refer Now
            </button>
          </div>
          <div className="relative">
            <img
              src="./refer.png"
              alt="Students using Accredian mobile app"
              width={600}
              height={500}
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal m-auto">
        <div className="modal-box p-6">
          <h3 className="font-bold text-lg mb-2">Refer a Friend</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="refereeEmail"
              placeholder="Referee Email"
              value={formData.refereeEmail}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="refereeName"
              placeholder="Referee Name"
              value={formData.refereeName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="hidden"
              name="referralLink"
              value={formData.referralLink}
            />
            <input
              type="email"
              name="referrerEmail"
              placeholder="Your Email"
              value={formData.referrerEmail}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="referrerName"
              placeholder="Your Name"
              value={formData.referrerName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-between mt-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Submit
              </button>
              <button type="button" onClick={() => document.getElementById("my_modal_2").close()} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default App;