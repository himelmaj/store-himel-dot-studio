"use client";

import ErrorComponent from "next/error";

const NotFound = () => {
	return (
		<html lang="en">
			<body>
				<ErrorComponent statusCode={404} />
			</body>
		</html>
	);
};

export default NotFound;
