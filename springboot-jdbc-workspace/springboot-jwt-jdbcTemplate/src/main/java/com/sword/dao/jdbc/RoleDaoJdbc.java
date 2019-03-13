package com.sword.dao.jdbc;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.sword.dao.RoleDao;
import com.sword.model.Role;

@Repository
public class RoleDaoJdbc implements RoleDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	//@Transactional(readOnly = true)
	public List<Role> findAll() {
		return jdbcTemplate.query("select * from roles", new RoleRowMapper());
	}

	@Override
	public Set<Role> findRoleByUserId(long userId) {
		List<Role> roles = jdbcTemplate.query("SELECT roles.role_id, roles.role_code,roles.role_description FROM `user_roles` \n" + 
				"inner join roles on user_roles.role_id = roles.role_id where user_roles.user_id = "+ userId, new RoleRowMapper());
		return new HashSet<Role>(roles);
	}

}
