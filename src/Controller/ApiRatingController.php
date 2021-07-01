<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("{_locale}/api/ratings/", name="api_rating")
 */
class ApiRatingController extends AbstractApiController
{
	private $entityManager;

	public function __construct(
		SerializerInterface $serializer,
		EntityManagerInterface $entityManager
	)
	{
		parent::__construct($serializer);
		$this->entityManager = $entityManager;
	}


}