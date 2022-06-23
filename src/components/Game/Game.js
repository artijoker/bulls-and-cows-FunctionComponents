import React, { useState } from 'react';
import './Game.css';
import History from '../History/History'
import RecordsTable from "../RecordsTable/RecordsTable"

var cipher = "";

export default function Game() {
	const [getAnswer, setAnswer] = useState("");
	const [getIsButtonOn, setIsButtonOn] = useState(false);
	const [getHistory, setHistory] = useState([]);
	const [getRecords, setRecords] = useState([]);
	const [getAttempts, setAttempts] = useState(0);
	const [getIsGameOn, setIsGameOn] = useState(false);
	

	const onChangeInput = (event) => {
		let value = event.target.value;

		if (!/^[0-9]{0,4}$/.test(value))
			return;
		
		setAnswer(value);

		if (value.length === 4)
			setIsButtonOn(true);
		else
			setIsButtonOn(false);
	}

	const checkWin = (answer, cipher) => {
		let length = cipher.length;
		let bulls = 0;
		let cows = 0;
		let char = "-";

		for (let i = 0; i < length; i++) {
			if (answer[i] === cipher[i]) {
				++bulls;
				answer = setCharAt(answer, i, char);
				cipher = setCharAt(cipher, i, char);
			}
		}
		for (let i = 0; i < length; i++) {
			if (answer[i] === char)
				continue;

			for (let j = 0; j < length; j++) {
				if (cipher[j] === char)
					continue;

				if (answer[i] === cipher[j]) {
					++cows;
					answer = setCharAt(answer, i, char);
					cipher = setCharAt(cipher, j, char);
					break;
				}
			}
		}
		// console.log(cipher);
		// console.log(answer);

		let result = {
			guess: getAnswer,
			result: `${bulls}Б${cows}К`
		};

		if (bulls === 4) {
			let message = "Игра окончена. Количество попыток " +
				(getAttempts + 1) +
				". Введите имя если хотите сохранить результат в таблице рекордов";
			let name = prompt(message, '');

			if (name !== null) {
				let record = {
					attempts: getAttempts + 1,
					name: name
				};
				let newArrayRecords = [...getRecords, record];
				newArrayRecords.sort((a, b) => {
					if (a.attempts > b.attempts) {
						return 1;
					}
					if (a.attempts < b.attempts) {
						return -1;
					}
					return 0;
				})
				setAnswer("");
				setIsButtonOn(false);
				setHistory([...getHistory, result])
				setRecords(newArrayRecords);
				setAttempts(0);
				setIsGameOn(false);
			}
			else {
				setAnswer("");
				setIsButtonOn(false);
				setHistory([...getHistory, result])
				setAttempts(0);
				setIsGameOn(false);
			}

		}
		else {
			setAnswer("");
			setIsButtonOn(false);
			setHistory([...getHistory, result])
			setAttempts(getAttempts + 1);
		}
	}


	return <div className='Game'>
		<div className='row'>
			<div className='col'>
				<h4 className='m-4'>Таблица рекордов</h4>
				<RecordsTable getRecords={() => getRecords} />
			</div>
			<div className='col m-4'>
				<button className='btn btn-primary'
					onClick={() => {
						cipher = getNewCipher(4);
						setIsGameOn(true);
						setHistory([]);
						alert("Игра началась! Угадайте шифр из 4 цифр.")
					}}>
					Hовая игра
				</button>
				<div className='m-5 p-3'>
					<form onSubmit={(event) => {
						checkWin(getAnswer, cipher);
						event.preventDefault();
					}}>
						<p>
							<label>Введите комбинацию из 4 цифр:
								<input disabled={!getIsGameOn}
									type="text"
									value={getAnswer}
									onChange={onChangeInput} />
							</label>
						</p>
						<p>
							<input className='btn btn-success m-3'
								disabled={!getIsButtonOn}
								type="submit"
								value="Проверить" />
						</p>
					</form>
				</div>
			</div>
			<div className='col m-4'>
				<h4>История</h4>
				<History getHistory={() => getHistory} />
			</div>
		</div>
	</div>
}


function setCharAt(string, index, char) {
	if (index > string.length - 1)
		return string;

	return string.substring(0, index) + char + string.substring(index + 1);
}

function getNewCipher(length) {
	let cipher = "";

	for (let i = 0; i < length; i++)
		cipher += Math.floor((Math.random() * 10) + 0);

	//console.log(`cipher = ${cipher}`);
	return cipher;
}