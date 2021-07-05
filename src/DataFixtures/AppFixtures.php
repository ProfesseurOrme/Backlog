<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
	public $encoder;

	public function __construct(UserPasswordEncoderInterface $encodePassword) {
		$this->encoder = $encodePassword;
	}

	public function load(ObjectManager $manager)
	{
			$user = new User();
			$user->setRoles(["ROLE_ADMIN"])
				->setEmail("test@mail.fr")
				->setName("AdminName")
				->setLastname("AdminLastname")
				->setCreatedAt(new \DateTime("NOW"));
			;

			$plainPassword = "test1234";
			$encodedPassword = $this->encoder->encodePassword($user, $plainPassword);

			$user->setPassword($encodedPassword);

			$manager->persist($user);
			$manager->flush();
	}
}
