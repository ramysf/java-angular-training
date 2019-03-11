package com.sword.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.sword.dao.UserDao;
import com.sword.model.User;

@Repository
public class UserDaoJdbc implements UserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	//@Transactional(readOnly = true)
	public List<User> findAll() {
		return jdbcTemplate.query("select * from user", new UserRowMapper());
	}

	@Override
	//@Transactional(readOnly = true)
	public User findUserById(long id) {
		return jdbcTemplate.queryForObject("select * from user where id=?", new Object[] { id }, new UserRowMapper());
	}

	@Override
	//@Transactional(readOnly = true)
	public User findByUsername(String username) {
		return jdbcTemplate.queryForObject("select * from user where username=?", new Object[] { username },new UserRowMapper());
	}

	@Override
	public void deleteById(long id) {
		final String sql = "delete from user where id=?";
		jdbcTemplate.update(sql, new Object[] { id });
	}

	@Override
	public User create(final User user) {
		final String sql = "insert into user(password,username,email) values(?,?,?)";
		int newUserId =insert(sql,new Object[] {user.getPassword(),user.getUsername(),user.getEmail()},"id");
		user.setId(newUserId);
		return user;
	}
	
	public int insert(String sql, Object[] obj, String column){
		KeyHolder holder = new GeneratedKeyHolder();
		jdbcTemplate.update(
			    new PreparedStatementCreator() {
			    	@Override
					public PreparedStatement createPreparedStatement(
							Connection connection) throws SQLException {
						 	PreparedStatement ps =connection.prepareStatement(sql, new String[] {column});
						 	for(int i=0;i<obj.length;i++){
						 		ps.setObject(i+1, obj[i]);
						 	}
						 	return ps;
					}
			    },
			    holder);
		return holder.getKey().intValue();
	};

}
