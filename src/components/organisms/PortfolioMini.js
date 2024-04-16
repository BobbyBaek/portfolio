import React from "react";
import styled from "styled-components";

function PortfolioMini() {
	const nodes = [].slice.call(document.querySelectorAll("li"), 0);
	const directions = { 0: "top", 1: "right", 2: "bottom", 3: "left" };
	const classNames = ["in", "out"].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));

	const getDirectionKey = (ev, node) => {
		const { width, height, top, left } = node.getBoundingClientRect();
		const l = ev.pageX - (left + window.pageXOffset);
		const t = ev.pageY - (top + window.pageYOffset);
		const x = l - (width / 2) * (width > height ? height / width : 1);
		const y = t - (height / 2) * (height > width ? width / height : 1);
		return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
	};

	class Item {
		constructor(element) {
			this.element = element;
			this.element.addEventListener("mouseover", (ev) => this.update(ev, "in"));
			this.element.addEventListener("mouseout", (ev) => this.update(ev, "out"));
		}

		update(ev, prefix) {
			this.element.classList.remove(...classNames);
			this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
		}
	}

	nodes.forEach((node) => new Item(node));


}

export default PortfolioMini;

const StyledList = styled.div`
	max-width: 1140px;
	margin: auto;
	padding-bottom: 80px;
	h2 {
		padding-top: 20px;
		margin-bottom: 40px;
		font-size: 26px;
		font-weight: 600;
		text-align: center;
		position: relative;
		&::after {
			content: "";
			position: absolute;
			top: 0px;
			left: 0px;
			right: 0px;
			margin: auto;
			width: 500px;
			height: 1px;
			background-color: rgb(37, 37, 37);
		}
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		width: 80%;
		margin: auto;
		li {
			width: 30%;
			margin-bottom: 4px;

			i {
				margin-right: 8px;
				vertical-align: top;
				line-height: 26px;
				color: ${(props) => props.theme.mainColor};
			}
			p {
				display: inline-block;
			}
		}
	}
	@media ${(props) => props.theme.laptop} {
		ul {
			li {
				width: 45%;
			}
		}
	}
	@media ${(props) => props.theme.mobile} {
		h2 {
			&::after {
				width: 70%;
			}
		}
		ul {
			width: 75%;
			li {
				width: 100%;
			}
		}
	}
`;
