package com.sword.dao;

import java.util.List;

import com.sword.model.User;

public interface UserDao {

	List<User> findAll();

	User findUserById(long id);

	User findByUsername(String username);

	void deleteById(long id);

	User create(User user);

}
