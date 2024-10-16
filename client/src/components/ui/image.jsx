export const Image = ({ setFormData }) => {
	const handleChange = (event) => {
		let [image] = event.target.files; // The Imported Image URL
		let reader = new FileReader();
		reader.readAsDataURL(image); // Convert The Imported Image To String

		// When The Image Is Imported
		reader.onload = (event) => {
			let imageURL = event.target.result; // The Old URL With Size -> 1.6Mb
			let img = document.createElement("img");
			img.setAttribute("src", imageURL);

			img.onload = (event) => {
				let width = 300;
				let ratio = width / event.target.width;
				let canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = event.target.height * ratio;

				let context = canvas.getContext("2d");
				context.drawImage(img, 0, 0, canvas.width, canvas.height);

				let newImgURL = context.canvas.toDataURL("image/jpeg", 90); // The New URL With Size -> 126Kb
				setFormData((f) => ({ ...f, img: newImgURL }));
			};
		};
	};

	return <input type="file" onChange={handleChange} />;
};
