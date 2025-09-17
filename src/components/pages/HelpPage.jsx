export default function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
        Help & Support
      </h1>

      {/* Contact Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <button className="btn btn-outline w-full">
          📧 Email Us
        </button>
        <button className="btn btn-outline w-full">
          📞 Call Support
        </button>
      </div>

      {/* FAQ Section */}
      <div className="collapse collapse-arrow bg-base-200 mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          How do I reset my password?
        </div>
        <div className="collapse-content">
          <p>Go to Settings → Reset Password and follow instructions sent to your email.</p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200 mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          How do I delete my account?
        </div>
        <div className="collapse-content">
          <p>Navigate to Settings → Account → Delete Account. This action is permanent.</p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200 mb-8">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          Why can't I see matches?
        </div>
        <div className="collapse-content">
          <p>Make sure your profile has at least one photo and correct preferences.</p>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="card bg-base-200 shadow-md mb-8">
        <div className="card-body">
          <h2 className="card-title text-pink-500">🔒 Safety Tips</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Never share financial details with strangers.</li>
            <li>Meet in public places for first few dates.</li>
            <li>Use in-app chat before exchanging numbers.</li>
            <li>Block or report suspicious users immediately.</li>
          </ul>
        </div>
      </div>

      {/* Report a Problem */}
      <button className="btn btn-primary w-full">
        🚨 Report a Problem
      </button>
    </div>
  );
}
