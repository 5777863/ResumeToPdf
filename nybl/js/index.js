$(document).ready(function() {
	$('#file_v').change(function(e) {
		var input = e.target;
		var reader = new FileReader();
		reader.onload = function() {
			var dataURL = reader.result;
			var output = document.getElementById('output');
			output.src = dataURL;
			$('#output').css('display', 'block');
		};
		reader.readAsDataURL(input.files[0]);
	})

	$('#exisub').click(function(e) {
		e.preventDefault();
		var dataform = $('#existsmail').val();
		$('#existsmail').val('');
		$.ajax({
			url : 'existsmail',
			type : 'POST',
			data : JSON.stringify({
				email : dataform
			}),
			dataType : "json",
			cache : false,
			contentType : "application/json",
			success : function(rJson) {
				if (rJson.error != null) {
					alert(rJson.error);
				} else {
					if (rJson) {
						alert('Ваше рюземе найдено и отправлено Вам на почту');
					} else {
						alert('Ваше рюземе не найдено');
					}
				}
			}
		});
	})
})
