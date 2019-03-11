package com.sword.dao.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.sword.model.User;

class UserRowMapper implements RowMapper<User> {
	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		User user = new User();
		user.setId(rs.getLong("id"));
		user.setPassword(rs.getString("password"));
		user.setUsername(rs.getString("username"));
		user.setEmail(rs.getString("email"));
		return user;
	}
}
