package com.sword.dao.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.sword.model.Role;
import com.sword.model.User;

class RoleRowMapper implements RowMapper<Role> {
	@Override
	public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
		Role role = new Role();
		role.setId(rs.getLong("role_id"));
		role.setName(rs.getString("role_code"));
		role.setDescription(rs.getString("role_description"));
		return role;
	}
}
