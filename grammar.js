module.exports = grammar({
	name: 'jack',

	rules: {
		source_file: $ => repeat($.class),

		class: $ => seq(
			'class',
			field('name', $.identifier),
			'{',
			repeat($.class_var_dec),
			repeat($.subroutine_dec),
			'}'

		),

		class_var_dec: $ => seq(
			choice('static', 'field'),
			$.type,
			$.var_name,
			repeat(
				seq(
					',',
					$.var_name
				)
			),
			';'
		),

		type: $ => choice(
			'int',
			'char',
			'boolean',
			$.class_name,
		),

		subroutine_dec: $ => seq(
			choice(
				'constructor',
				'function',
				'method'
			),
			choice(
				'void',
				$.type
			),
			$.subroutine_name,
			$.parameter_list,
			$.subroutine_body
		),

		parameter_list: $ => seq(
			'(',
			optional(
				seq(
					$.type,
					$.var_name,
					repeat(
						seq(
							',',
							$.type,
							$.var_name
						)
					)
				)
			),
			')'
		),

		subroutine_body: $ => seq(
			'{',
			repeat($.var_dec),
			repeat($.statement),
			'}'
		),

		var_dec: $ => seq(
			'var',
			$.type,
			$.var_name,
			repeat(
				seq(
					',',
					$.var_name
				)
			),
			';'
		),

		class_name: $ => prec(3, $.identifier),

		subroutine_name: $ => prec(2, $.identifier),

		var_name: $ => prec(1, $.identifier),

		identifier: $ => { 
			const letter = choice(/\p{L}/, '_');
			const digit = /[0-9]/;
			return token(seq(letter, repeat(choice(letter, digit))));
		},

		statements: $ => seq(
			'{',
			repeat($.statement),
			'}'
		),

		statement: $ => choice(
			$.let_statement,
			$.if_statement,
			$.while_statement,
			$.do_statement,
			$.return_statement
		),

		let_statement: $ => seq(
			'let',
			$.var_name,
			optional(
				seq(
					'[',
					$.expression,
					']'
				)
			),
			'=',
			$.expression,
			';'
		),

		if_statement: $ => seq(
			'if',
			'(',
			$.expression,
			')',
			$.statements,
			optional(
				seq(
					'else',
					$.statements
				)
			)
		),

		while_statement: $ => seq(
			'while',
			'(',
			$.expression,
			')',
			$.statements
		),

		do_statement: $ => seq(
			'do',
			$.subroutine_call,
			';'
		),

		return_statement: $ => seq(
			'return',
			optional($.expression),
			';'
		),

		expression: $ => seq(
			$.term,
			repeat(
				seq(
					$.op,
					$.term
				)
			)
		),

		term: $ => choice(
			$.integer_constant,
			$.string_constant,
			$.keyword_constant,
			$.var_name,
			seq(
				$.var_name,
				'[',
				$.expression,
				']'
			),
			seq(
				'(',
				$.expression,
				')'
			),
			seq(
				$.unary_op,
				$.term
			),
			$.subroutine_call
		),

		subroutine_call: $ => choice(
			seq(
				$.subroutine_name,
				$.expression_list,
			),
			seq(
				choice(
					$.class_name,
					$.var_name
				),
				'.',
				$.subroutine_name,
				$.expression_list,
			)
		),

		expression_list: $ =>
			seq(
				'(',
				optional(
					seq(
						$.expression,
						repeat(
							seq(
								',',
								$.expression
							)
						)
					)
				),
				')'
			),

		op: $ => choice(
			'+',
			'-',
			'*',
			'/',
			'&',
			'|',
			'<',
			'>',
			'='
		),

		unary_op: $ => choice(
			'-',
			'~'
		),

		keyword_constant: $ => choice(
			'true',
			'false',
			'null',
			'this'
		),

		integer_constant: $ => /\d+/,

		string_constant: $ => seq(
			'"',
			/.*/,
			'"'
		)
	}
});
