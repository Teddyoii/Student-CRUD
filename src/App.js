import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";

function App() {
	let [items, setItems] = useState([]);
	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [desc, setDesc] = useState("");

	const codeHandler = (e) => {
		setCode(e.target.value);
	};

	const nameHandler = (e) => {
		setName(e.target.value);
	};

	const priceHandler = (e) => {
		setPrice(e.target.value);
	};

	const descHandler = (e) => {
		setDesc(e.target.value);
	};

	const getStudents = () => {
		fetch("http://localhost:8090/api/get")
			.then((response) => response.json())
			.then((data) => {
				setItems(data);
				console.log(data);
			});
	};

	const postStudents = async (e) => {
		await fetch("http://localhost:8090/api/add", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},

			body: JSON.stringify(e),
		});
		window.location.reload();
	};

	const deleteStudent = async (id) => {
		await fetch(`http://localhost:8090/api/delete/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		window.location.reload();
	};

	const saveStudent = (e) => {
		e.preventDefault();
		if (
			name === "" ||
			price === "" ||
			code === "" ||
			desc === "" ||
			name === null ||
			price === null ||
			code === null ||
			desc === null
		) {
			swal({
				title: "OOPS!",
				text: "You should fill all the fields!",
				icon: "error",
			});
		} else {
			items = { itemCode: code, name: name, price: price, description: desc };
			postStudents(items);
			console.log("student = > " + JSON.stringify(items));
			console.log(items);
			swal({
				title: "DONE!",
				text: "Successfully Added",
				icon: "success",
			});
		}
	};

	useEffect(() => {
		getStudents();
	}, []);

	return (
		<div className="App">
			<h1 className="heading">BuyMe SuperMarket</h1>
			<h3 className="heading">Products Table</h3>
			<form onSubmit={saveStudent}>
				<input
					className="codeInput"
					placeholder="enter Code of the Item"
					name="code"
					value={code}
					onChange={codeHandler}
				/>

				<input
					className="nameInput"
					placeholder="enter name of the Item"
					name="name"
					value={name}
					onChange={nameHandler}
				/>

				<input
					className="price"
					placeholder="enter price of the Item"
					name="price"
					value={price}
					onChange={priceHandler}
				/>

				<input
					className="descInput"
					placeholder="enter Description of the Item"
					name="description"
					value={desc}
					onChange={descHandler}
				/>
				<button className="primary-btn" type="submit">
					Add
				</button>
			</form>

			{items.map((item) => (
				<div className="content">
					<table key={item.id}>
						<tr>
							<th>List of Items</th>
						</tr>
						<tr>
							<th>Code</th>
							<th>Name</th>
							<th>Price</th>
							<th>Description</th>
						</tr>
						<tr>
							<td>{item.itemCode}</td>
							<td>{item.name}</td>
							<td>{item.price}</td>
							<td>{item.description}</td>
						</tr>
					</table>

					<button
						onClick={() => deleteStudent(item.id)}
						className="primary-btn danger"
					>
						Delete
					</button>
				</div>
			))}
		</div>
	);
}

export default App;
