module.exports = survey => {
	return `
		<!DOCTYLE html>
		<html>
			<body>
				<div style="text-align: center">
					<h3>I'd like your input!</h3>
					<p>Please answer the following question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="http://localhost:3000/api/surveys/greet">Yes</a>
					</div>
					<div>
						<a href="http://localhost:3000/api/surveys/greet">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
