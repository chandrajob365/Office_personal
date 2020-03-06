import React, { Suspense, lazy } from "react";
import "./App.css";
const AppHeader = lazy(() => import("./components/header"));
const AppContent = lazy(() => import("./containers/AppContent"));
function App() {
	return (
		<div className="App" data-test="appComponent">
			<Suspense fallback={<div>Loading...</div>}>
				<AppHeader />
				<AppContent />
			</Suspense>
		</div>
	);
}

export default App;
