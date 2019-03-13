package com.sword.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sword.dao.RoleDao;
import com.sword.dao.UserDao;
import com.sword.model.Role;
import com.sword.model.User;
import com.sword.service.UserService;

@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDao roleDao;

	@Autowired
	private BCryptPasswordEncoder bcryptEncoder;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDao.findByUsername(username);
		// TODO change
//		Role role = new Role();
//		role.setId(1);
//		role.setName("ROLE_ADMIN");
//		Role role1 = new Role();
//		role1.setId(2);
//		role1.setName("ROLE_USER");
//		Set<Role> roles = new HashSet<Role>();
//		roles.add(role);
//		roles.add(role1);
		Set<Role> roles = roleDao.findRoleByUserId(user.getId());
		if (user == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		user.setRoles(roles);
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),getAuthority(user));
	}

	private Set<SimpleGrantedAuthority> getAuthority(User user) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		user.getRoles().forEach(role -> {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		});
		return authorities;
	}

	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		userDao.findAll().iterator().forEachRemaining(list::add);
		for(User user : list) {
			Set<Role> roles = roleDao.findRoleByUserId(user.getId());
			user.setRoles(roles);
//			user.setRoles(roleDao.findRoleByUserId(user.getId()));
		}
		return list;
	}

	@Override
	public void delete(long id) {
		userDao.deleteById(id);
	}

	@Override
	public User findOne(String username) {
		return userDao.findByUsername(username);
	}

	@Override
	public User findById(Long id) {
		return userDao.findUserById(id);
	}

	@Override
	public User save(User user) {
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setEmail(user.getEmail());
		return userDao.create(newUser);
	}
}
