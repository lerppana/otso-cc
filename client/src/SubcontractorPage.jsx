var React = require('react'),
	_ = require('underscore'),
	Router = require('react-router'),
	dateFormat = require('dateformat'),
	Navigation = Router.Navigation,
	Button = require('react-bootstrap').Button,
	config = require('./config.js');

	require('../src/css/style.css');

var SubcontractorPage = React.createClass({
	mixins: [Router.State, Navigation],
	render: function() {
		return (
			<div id="subcontractor">
			</div>
		);
	},
	componentDidMount: function() {
		let $this = this,
			sc_data,
			fb_data,
			ajaxes = [],
			stars,
			orders,
			promise;

		ajaxes[0] = Promise.resolve($.ajax({
				url:`/subcontractor.json/${$this.props.id}`,
				contentType:'application/json',
				dataType:'json',
				type:'GET'
			})
		).then((data) => {
			sc_data = data;
			sc_data.id = $this.props.id;
		});

		ajaxes[1] = Promise.resolve($.ajax({
				url:'/feedback.json/*',
				contentType:'application/json',
				dataType:'json',
				type:'GET'
			})
		).then((data) => {
			fb_data = data;
		});

		ajaxes[2] = Promise.resolve($.ajax({
			url: '/order.json/*',
			contentType:'application/json',
			dataType:'json',
			type:'GET'
			})
		).then((data) => {
			orders = data;
		});

		promise = Promise.all(ajaxes).then(() => {

			let comments = _.map(fb_data, (comment, id) => {
				comment.id = id;
				return comment;
			});

			comments = _.filter(comments, (comment) => typeof orders[comment.id] !== 'undefined' && orders[comment.id].sc_id === $this.props.id);

			let stars = [],
				stars_html = [];
			for (let i = 0; i < 4; i++) {
				stars.push({total: 0, cnt: 0});
			}

			_.each(comments, (comment) => {
				_.each(comment.stars, (star, i) => {
					stars[i].total += star;
					stars[i].cnt++;
				});
			});
			
			_.each(stars, (star, i) => {
				star.average = star.cnt > 0 ? star.total / star.cnt : 0;

				let star_html = star.cnt > 0 ? [<span className="average">{star.average}</span>,<span>({star.cnt})</span>,<img className="icon-star" src="icons/star.svg" />] : <span className="no-reviews">no reviews yet</span>;

				stars_html.push(
					<div>
						<span className="name">{config.stars[i]}</span>
						<span> &mdash; </span>
						{star_html}
					</div>
				);
			});

			let content = [
					<div className="header-subcontractor">
						<div id="stars" className="stars">
							{stars_html}
						</div>
						<img className="img-circle img-subcontractor" src="icons/renovation.png" />
					</div>,
					<div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
						<p>{sc_data.name}</p>
					</div>,
					<div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
						<p>Phone: {sc_data.phone}</p>
					</div>,
					<div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
						<p>Address: {sc_data.address}</p>
					</div>,
					<div className="header-comments">{comments.length > 0 ? <h3>Comments</h3> : ''}</div>
			];
			
			if (comments.length > 0) {
				content.push(
					<div className="col-comment col-header col-lg-3 col-sm-3 col-md-3 col-xs-3">
						Date
					</div>,
					<div className="col-comment col-header col-lg-9 col-sm-9 col-md-9 col-xs-9">
						Comment
					</div>
				);
			}

			_.each(comments, (comment) => {
				content.push(
					<div className="col-comment col-lg-3 col-sm-3 col-md-3 col-xs-3">
					<span>{dateFormat(new Date(comment.date), "dd.mm.yyyy")}</span>
					</div>,
					<div className="col-comment col-lg-9 col-sm-9 col-md-9 col-xs-9">
						<span>{comment.comment}</span>
					</div>
				);
			});

			React.render(<div className="bs-component">{content}</div>, document.getElementById('subcontractor'));
		});
	}
});

module.exports = SubcontractorPage;
