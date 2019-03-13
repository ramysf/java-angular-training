package com.sword.dao;

import java.util.List;
import java.util.Set;

import com.sword.model.Role;

public interface RoleDao {

	List<Role> findAll();
	Set<Role> findRoleByUserId(long id);

}
